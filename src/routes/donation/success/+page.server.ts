import { statements } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const donationId = url.searchParams.get('id');
  
  if (!donationId) {
    throw error(400, 'Donation ID is required');
  }
  
  try {
    const donation = statements.getDonationById.get(parseInt(donationId));
    
    if (!donation) {
      throw error(404, 'Donation not found');
    }
    
    const project = statements.getProjectById.get(donation.project_id);
    
    if (!project) {
      throw error(404, 'Project not found');
    }
    
    return {
      donation: {
        id: donation.id,
        amount: donation.amount,
        status: donation.status,
        created_at: donation.created_at
      },
      project: {
        id: project.id,
        title: project.title
      }
    };
  } catch (err) {
    console.error('Error loading donation:', err);
    throw error(500, 'Failed to load donation details');
  }
};
