import { statements } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const projectId = parseInt(params.id);
  
  if (isNaN(projectId)) {
    throw error(404, 'Project not found');
  }
  
  try {
    const project = statements.getProjectById.get(projectId);
    
    if (!project) {
      throw error(404, 'Project not found');
    }
    
    // Update current amount
    statements.updateProjectAmount.run(projectId, projectId);
    
    // Get updated project
    const updatedProject = statements.getProjectById.get(projectId);
    
    // Get recent donations for this project (without sensitive info)
    const donations = statements.getDonationsByProject.all(projectId)
      .filter(d => d.status === 'completed')
      .slice(0, 10)
      .map(d => ({
        amount: d.amount,
        created_at: d.created_at
      }));
    
    return {
      project: updatedProject,
      recentDonations: donations
    };
  } catch (err) {
    console.error('Error loading project:', err);
    throw error(500, 'Failed to load project');
  }
};
