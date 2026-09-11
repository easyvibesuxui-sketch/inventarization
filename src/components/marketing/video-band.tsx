'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import BackgroundVideo from './background-video';

/**
 * A band whose backdrop is a clip scrubbed by the scroll position.
 *
 * The footage sits under a frosted pane rather than a flat white wash, and the
 * pointer opens a soft hole in that pane: where you are looking, the blur lifts
 * and the picture comes through: everywhere else it stays quiet enough to read
 * over. A separate wash, weakest at the edges, holds the type's contrast, and a
 * paper gradient from the left protects the column the text sits in.
 */
export default function VideoBand({
  name,
  children,
  className = '',
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  children: ReactNode;
  className?: string;
}) {
  const band = useRef<HTMLElement>(null);
  const frost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = band.current;
    const pane = frost.current;
    if (!element || !pane) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pane.style.setProperty('--px', `${x}px`);
        pane.style.setProperty('--py', `${y}px`);
      });
    };

    element.addEventListener('pointermove', move);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <section ref={band} className={`video-band relative isolate overflow-hidden ${className}`}>
      <BackgroundVideo
        name={name}
        bandRef={band}
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-80"
      />

      {/* The frosted pane, with the hole the pointer opens in it. */}
      <div ref={frost} aria-hidden className="video-frost absolute inset-0 -z-20" />

      {/* Contrast: a light wash that fades out at the top and bottom edges, and
          a paper gradient from the left for the column the type sits in. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-paper/12 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-paper/75 via-paper/10 to-transparent"
      />

      {/* A breath of ink at the corners, so the band has a shape instead of
          washing out into the page. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_40%,color-mix(in_srgb,var(--color-ink)_18%,transparent)_100%)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-paper via-transparent to-paper"
      />

      {children}
    </section>
  );
}
