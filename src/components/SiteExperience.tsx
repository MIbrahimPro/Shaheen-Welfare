'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { BASE } from '@/lib/site';

/**
 * Site-wide client experience:
 *  - a loader (logo + progress bar) that slides up to reveal the site,
 *  - Lenis smooth scrolling,
 *  - gentle parallax on elements marked with data-parallax="<speed>".
 *
 * Everything respects prefers-reduced-motion. The loader slides away on
 * every full page load but never on client-side route changes.
 *
 * Lenis is created once per route and only paused while the loader is up,
 * so its lifetime does not depend on loader state transitions.
 */
export default function SiteExperience() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false); // triggers the slide-up
  const [gone, setGone] = useState(false); // unmounts the overlay
  const [firstLoad, setFirstLoad] = useState(true);

  // Lenis smooth scrolling + parallax: once per route, paused during load.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // keep native scrolling on touch devices; Lenis smooths wheels only
      syncTouch: false,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    // hold scrolling only while the loader is actually up; on client-side
    // route changes the loader never remounts, so start immediately
    if (firstLoad) lenis.stop();

    let raf = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // parallax: data-parallax holds a speed like 0.12 (drifts down) or
    // -0.15 (drifts up) relative to scroll position
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    els.forEach((el) => el.classList.add('parallax'));
    const onScroll = () => {
      const y = window.scrollY;
      for (const el of els) {
        const speed = Number(el.dataset.parallax || 0);
        el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
      }
    };
    lenis.on('scroll', onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [pathname, firstLoad]);

  // Resume smooth scrolling when the loader starts sliding away.
  useEffect(() => {
    if (done) (window as unknown as { __lenis?: Lenis }).__lenis?.start();
  }, [done]);

  // Loader: ease the bar toward 85 while the page loads, then complete
  // and slide away once the browser has painted the content beneath.
  useEffect(() => {
    if (gone) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDone(true);
      setGone(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    let raf = 0;
    let value = 0;
    const started = performance.now();

    const tick = () => {
      value += (85 - value) * 0.08; // never reaches 100 on its own
      setProgress(Math.min(100, Math.round(value)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let cancelled = false;
    const release = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(raf);
      setFirstLoad(false);
      // minimum display time so the logo is actually seen
      const wait = Math.max(0, 900 - (performance.now() - started));
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setDone(true), 250);
        setTimeout(() => {
          setGone(true);
          document.body.style.overflow = '';
        }, 1050); // 250ms fill + 700ms slide + margin
      }, wait);
    };

    if (document.readyState === 'complete') {
      release();
    } else {
      window.addEventListener('load', release, { once: true });
    }
    // hard cap: never trap the user behind the loader
    const cap = setTimeout(release, 4000);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      window.removeEventListener('load', release);
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden={done} role="status" aria-label="Loading">
      <img src={`${BASE}/logo.jpeg`} alt="" />
      <div className="loader-bar">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-label">Shaheen Welfare Society</div>
    </div>
  );
}
