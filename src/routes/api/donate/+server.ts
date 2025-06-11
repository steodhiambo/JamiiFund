import { json } from '@sveltejs/kit';
import { statements } from '$lib/database';
import { mpesaService } from '$lib/mpesa';
import { donationRateLimit } from '$lib/rateLimit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const clientIP = getClientAddress();

  // Rate limiting
  if (!donationRateLimit.isAllowed(clientIP)) {
    return json({
      error: 'Too many donation attempts. Please wait before trying again.',
      remainingRequests: donationRateLimit.getRemainingRequests(clientIP)
    }, { status: 429 });
  }
  try {
    const { project_id, amount, phone_number } = await request.json();

    // Validate and sanitize input
    if (!project_id || !amount || !phone_number) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate project_id is a positive integer
    const projectId = parseInt(project_id);
    if (isNaN(projectId) || projectId <= 0) {
      return json({ error: 'Invalid project ID' }, { status: 400 });
    }

    // Validate amount is a positive number
    const donationAmount = parseInt(amount);
    if (isNaN(donationAmount) || donationAmount < 100 || donationAmount > 10000000) { // Max 100,000 KES
      return json({ error: 'Invalid amount. Must be between KES 1 and KES 100,000' }, { status: 400 });
    }

    // Validate and sanitize phone number
    const cleanPhone = phone_number.toString().replace(/[^\d+]/g, '');
    if (!/^(\+?254|0)[17]\d{8}$/.test(cleanPhone)) {
      return json({ error: 'Invalid Kenyan phone number format' }, { status: 400 });
    }
    
    // Check if project exists
    const project = statements.getProjectById.get(projectId);
    if (!project) {
      return json({ error: 'Project not found' }, { status: 404 });
    }

    // Create donation record
    const donationResult = statements.createDonation.run(
      projectId,
      donationAmount,
      cleanPhone,
      null, // mpesa_transaction_id will be updated later
      'pending'
    );

    const donationId = donationResult.lastInsertRowid;

    try {
      // Initiate Mpesa STK push
      const mpesaResponse = await mpesaService.initiateSTKPush(
        cleanPhone,
        donationAmount,
        `Project-${projectId}-${donationId}`
      );
      
      if (mpesaResponse.ResponseCode === '0') {
        // Update donation with checkout request ID
        statements.updateDonationStatus.run(
          'pending',
          mpesaResponse.CheckoutRequestID,
          donationId
        );
        
        return json({
          success: true,
          donationId,
          message: 'Payment request sent to your phone. Please complete the payment.',
          checkoutRequestId: mpesaResponse.CheckoutRequestID
        });
      } else {
        // Update donation status to failed
        statements.updateDonationStatus.run('failed', null, donationId);
        
        return json({
          error: mpesaResponse.ResponseDescription || 'Failed to initiate payment'
        }, { status: 400 });
      }
      
    } catch (mpesaError) {
      console.error('Mpesa error:', mpesaError);
      
      // Update donation status to failed
      statements.updateDonationStatus.run('failed', null, donationId);
      
      return json({
        error: 'Payment service temporarily unavailable. Please try again later.'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Donation error:', error);
    return json({
      error: 'An error occurred while processing your donation'
    }, { status: 500 });
  }
};
