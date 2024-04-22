'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // User is logged in, navigate to admin page
        redirect('/admin/default');
    } else {
      // User is not logged in, navigate to sign-in page
        redirect('/auth/sign-in');
    }
  }, []);

  return null; // Return null or some loading indicator while the redirection happens
}
