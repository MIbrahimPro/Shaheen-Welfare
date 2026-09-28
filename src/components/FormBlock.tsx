'use client';

import { useState, type FormEvent } from 'react';
import { BASE } from '@/lib/site';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required?: boolean;
  hint?: string;
  options?: string[];
  rows?: number;
  placeholder?: string;
  autoComplete?: string;
}

interface Props {
  endpoint: string;
  fields: FieldDef[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
}

export default function FormBlock({ endpoint, fields, submitLabel, successTitle, successMessage }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`${BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Submission failed. Please try again.');
      setStatus('done');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'done') {
    return (
      <div className="alert" role="status">
        <strong>{successTitle}</strong>
        <p style={{ marginTop: 6, fontWeight: 400 }}>{successMessage}</p>
        <button className="btn btn--ghost btn--sm" style={{ marginTop: 12 }} onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {status === 'error' && (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      )}
      {fields.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={`f-${f.name}`}>
            {f.label}
            {f.hint && <span className="hint">{f.hint}</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea id={`f-${f.name}`} name={f.name} rows={f.rows ?? 5} required={f.required} placeholder={f.placeholder} />
          ) : f.type === 'select' ? (
            <select id={`f-${f.name}`} name={f.name} required={f.required} defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              {(f.options ?? []).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`f-${f.name}`}
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
            />
          )}
        </div>
      ))}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
