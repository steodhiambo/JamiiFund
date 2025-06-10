import { statements } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // Get all projects with updated amounts
    const projects = statements.getAllProjects.all();
    for (const project of projects) {
      statements.updateProjectAmount.run(project.id, project.id);
    }
    const updatedProjects = statements.getAllProjects.all();
    
    // Get all donations
    const donations = statements.getAllDonations.all();
    
    // Calculate statistics
    const totalProjects = updatedProjects.length;
    const totalRaised = donations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = donations.filter(d => d.status === 'completed').length;
    const pendingDonations = donations.filter(d => d.status === 'pending').length;
    
    // Recent donations (last 10)
    const recentDonations = donations
      .filter(d => d.status === 'completed')
      .slice(0, 10);
    
    // Project performance
    const projectStats = updatedProjects.map(project => {
      const projectDonations = donations.filter(d => 
        d.project_id === project.id && d.status === 'completed'
      );
      return {
        ...project,
        donationCount: projectDonations.length,
        progressPercentage: Math.min((project.current_amount / project.goal_amount) * 100, 100)
      };
    });
    
    return {
      stats: {
        totalProjects,
        totalRaised,
        totalDonations,
        pendingDonations
      },
      recentDonations,
      projectStats
    };
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
    return {
      stats: {
        totalProjects: 0,
        totalRaised: 0,
        totalDonations: 0,
        pendingDonations: 0
      },
      recentDonations: [],
      projectStats: []
    };
  }
};
