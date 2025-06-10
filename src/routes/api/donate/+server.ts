import { json } from '@sveltejs/kit';
import { statements } from '$lib/database';
import { mpesaService } from '$lib/mpesa';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { project_id, amount, phone_number } = await request.json();
    
    // Validate input
    if (!project_id || !amount || !phone_number) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (amount < 100) { // Minimum 1 KES
      return json({ error: 'Minimum donation amount is KES 1' }, { status: 400 });
    }
    
    // Check if project exists
    const project = statements.getProjectById.get(project_id);
    if (!project) {
      return json({ error: 'Project not found' }, { status: 404 });
    }
    
    // Create donation record
    const donationResult = statements.createDonation.run(
      project_id,
      amount,
      phone_number,
      null, // mpesa_transaction_id will be updated later
      'pending'
    );
    
    const donationId = donationResult.lastInsertRowid;
    
    try {
      // Initiate Mpesa STK push
      const mpesaResponse = await mpesaService.initiateSTKPush(
        phone_number,
        amount,
        `Project-${project_id}-${donationId}`
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
