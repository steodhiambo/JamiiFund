import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { Actions, PageServerLoad } from './$types';

// In production, this should be stored securely in environment variables
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10);

export const load: PageServerLoad = async ({ cookies }) => {
  // If already authenticated, redirect to dashboard
  if (cookies.get('admin-session') === 'authenticated') {
    throw redirect(302, '/admin');
  }
  
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password') as string;
    
    if (!password) {
      return fail(400, { error: 'Password is required' });
    }
    
    const isValid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
    
    if (!isValid) {
      return fail(400, { error: 'Invalid password' });
    }
    
    // Set authentication cookie
    cookies.set('admin-session', 'authenticated', {
      path: '/',
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    
    throw redirect(302, '/admin');
  }
};
