'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV, SITE } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="hide-sm">{SITE.address}</span>
          <span>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            {' · '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/logo.jpeg" alt={`${SITE.name} logo`} />
            <span>
              <span className="brand-name">Shaheen Welfare Society</span>
              <br />
              <span className="brand-sub">SARGODHA · EST. 2001</span>
            </span>
          </Link>
          <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
            Menu
          </button>
          <nav id="main-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/volunteer" className="btn btn--sm" onClick={() => setOpen(false)}>
              Volunteer
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
