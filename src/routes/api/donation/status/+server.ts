import { json } from '@sveltejs/kit';
import { statements } from '$lib/database';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const donationId = url.searchParams.get('id');
    
    if (!donationId) {
      return json({ error: 'Donation ID is required' }, { status: 400 });
    }
    
    const donation = statements.getDonationById.get(parseInt(donationId));
    
    if (!donation) {
      return json({ error: 'Donation not found' }, { status: 404 });
    }
    
    return json({
      status: donation.status,
      amount: donation.amount,
      created_at: donation.created_at
    });
    
  } catch (error) {
    console.error('Error checking donation status:', error);
    return json({
      error: 'An error occurred while checking donation status'
    }, { status: 500 });
  }
};
