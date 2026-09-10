import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from './login-form';
import { isSupabaseConfigured } from '@/lib/env';
import { Alert } from '@/components/ui';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <main className="grid-wash flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/ka" className="mb-8 flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Inverse</span>
          <span className="rounded bg-accent-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-500">
            Beta
          </span>
        </Link>
        {!isSupabaseConfigured() && (
          <div className="mb-4">
            <Alert tone="info">
              This is a preview with no Supabase project attached, so accounts are
              unavailable. The landing page and the pricing calculator are fully live.
            </Alert>
          </div>
        )}
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
