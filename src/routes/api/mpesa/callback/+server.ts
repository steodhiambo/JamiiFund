import { json } from '@sveltejs/kit';
import { statements } from '$lib/database';
import type { RequestHandler } from './$types';
import type { MpesaCallback } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const callbackData: MpesaCallback = await request.json();
    
    console.log('Mpesa callback received:', JSON.stringify(callbackData, null, 2));
    
    const { stkCallback } = callbackData.Body;
    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;
    
    // Find donation by checkout request ID
    const donation = statements.getDonationByMpesaId.get(CheckoutRequestID);
    
    if (!donation) {
      console.error('Donation not found for CheckoutRequestID:', CheckoutRequestID);
      return json({ ResultCode: 0, ResultDesc: 'Success' });
    }
    
    if (ResultCode === 0) {
      // Payment successful
      let mpesaReceiptNumber = '';
      
      if (CallbackMetadata && CallbackMetadata.Item) {
        const receiptItem = CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber');
        if (receiptItem) {
          mpesaReceiptNumber = receiptItem.Value.toString();
        }
      }
      
      // Update donation status to completed
      statements.updateDonationStatus.run('completed', mpesaReceiptNumber, donation.id);
      
      // Update project current amount
      statements.updateProjectAmount.run(donation.project_id, donation.project_id);
      
      console.log(`Donation ${donation.id} completed successfully. Receipt: ${mpesaReceiptNumber}`);
      
    } else {
      // Payment failed
      statements.updateDonationStatus.run('failed', null, donation.id);
      
      console.log(`Donation ${donation.id} failed. Reason: ${ResultDesc}`);
    }
    
    // Always return success to Mpesa
    return json({ ResultCode: 0, ResultDesc: 'Success' });
    
  } catch (error) {
    console.error('Error processing Mpesa callback:', error);
    
    // Still return success to avoid retries
    return json({ ResultCode: 0, ResultDesc: 'Success' });
  }
};
