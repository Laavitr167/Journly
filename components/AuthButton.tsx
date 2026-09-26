'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';

export default function AuthButton() {
  const { user, signInWithGoogle, signOut } = useAuth();

  if (user) {
    return (
      <>
        <Link href="/plan">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
            Plan a trip
          </button>
        </Link>
        <button
          onClick={signOut}
          className="ml-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
        >
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <Link href="/plan">
        <button
          onClick={signInWithGoogle}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Sign in with Google
        </button>
      </Link>
    );
  }
}