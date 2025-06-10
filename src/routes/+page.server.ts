import { statements } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const projects = statements.getAllProjects.all();
    
    // Update current amounts for all projects
    for (const project of projects) {
      statements.updateProjectAmount.run(project.id, project.id);
    }
    
    // Get updated projects with current amounts
    const updatedProjects = statements.getAllProjects.all();
    
    return {
      projects: updatedProjects
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projects: []
    };
  }
};
