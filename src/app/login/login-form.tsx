'use client';

import { useActionState, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn, signUp, type AuthState } from './actions';
import { Alert, Button, Field, inputClass } from '@/components/ui';

const EMPTY: AuthState = {};

export default function LoginForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const linkError = searchParams.get('error');

  const [state, action, pending] = useActionState(
    mode === 'signin' ? signIn : signUp,
    EMPTY,
  );

  return (
    <div className="rounded-xl border border-rule/70 bg-paper-sunk/70 p-6">
      <div className="mb-5 flex rounded-lg border border-rule bg-paper-sunk p-1 text-sm">
        {(['signin', 'signup'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`flex-1 rounded-md px-3 py-1.5 font-medium transition ${
              mode === value ? 'bg-rule text-ink' : 'text-ink-faint hover:text-ink'
            }`}
          >
            {value === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        ))}
      </div>

      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {mode === 'signup' && (
          <Field label="Full name">
            <input name="full_name" autoComplete="name" className={inputClass} />
          </Field>
        )}

        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field
          label="Password"
          hint={mode === 'signup' ? 'At least 8 characters.' : undefined}
        >
          <input
            name="password"
            type="password"
            required
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            className={inputClass}
          />
        </Field>

        {(state.error || linkError) && <Alert>{state.error ?? linkError}</Alert>}
        {state.notice && <Alert tone="info">{state.notice}</Alert>}

        <Button type="submit" disabled={pending} className="w-full">
          {pending
            ? 'Working…'
            : mode === 'signin'
              ? 'Sign in'
              : 'Create account'}
        </Button>
      </form>
    </div>
  );
}
