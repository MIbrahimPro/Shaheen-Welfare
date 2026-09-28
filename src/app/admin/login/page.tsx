'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BASE } from '@/lib/site';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch(`${BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(body.error || 'Sign-in failed.');
      setBusy(false);
      return;
    }
    const next = params.get('next') || '/admin';
    router.push(next.startsWith('/admin') ? next : '/admin');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      )}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button className="btn" type="submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="section">
      <div className="wrap" style={{ maxWidth: 440 }}>
        <h1>Staff sign-in</h1>
        <p className="form-note" style={{ margin: '10px 0 28px' }}>
          Restricted area for Shaheen Welfare Society staff.
        </p>
        <Suspense fallback={<p className="form-note">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
