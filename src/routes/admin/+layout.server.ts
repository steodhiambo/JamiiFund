import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const isAuthenticated = cookies.get('admin-session') === 'authenticated';
  
  // Allow access to login page without authentication
  if (!isAuthenticated && url.pathname !== '/admin/login') {
    throw redirect(302, '/admin/login');
  }
  
  return {
    isAuthenticated
  };
};
