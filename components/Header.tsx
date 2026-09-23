'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, signOut, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-indigo-600">Journly</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                {/* Avatar placeholder - in a real app, you'd use the user's avatar */}
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {user.user_metadata?.full_name?.charAt(0) ?? user.email?.charAt(0) ?? '?'}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User'}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}