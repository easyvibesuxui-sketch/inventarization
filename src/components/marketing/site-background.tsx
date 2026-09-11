'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import BackgroundVideo from './background-video';

/**
 * The site's backdrop: three clips fixed behind every page, handing over to one
 * another as the reader travels down it.
 *
 * All three are stacked and the scroll position decides which is showing. A
 * single clip behind five thousand pixels of page goes dead about a screen in;
 * three, crossfading at the thirds, make the descent feel like walking through
 * a building rather than standing in one room.
 *
 * The handover is not a plain dissolve. The outgoing clip drifts back as the
 * incoming one settles forward, and the frost thickens through the crossing and
 * clears again — the page takes a breath at the seam, so the change reads as a
 * deliberate cut instead of two pictures briefly muddled together.
 *
 * Playback still belongs to the scroll: nothing runs until the reader moves,
 * and everything settles 400ms after they stop. Only the clips actually on
 * screen decode; the others hold a frame.
 */
const CLIPS = ['aisle', 'scan', 'racks'] as const;

/** How far a clip drifts back when it is not the one being looked at. */
const DRIFT = 0.055;

/** Each part of the site opens on the clip that belongs to it, then cycles. */
function orderFor(pathname: string) {
  const opening = /\/services(\/|$)/.test(pathname)
    ? 'racks'
    : /\/platform(\/|$)/.test(pathname)
      ? 'scan'
      : 'aisle';

  const at = CLIPS.indexOf(opening as (typeof CLIPS)[number]);
  return [...CLIPS.slice(at), ...CLIPS.slice(0, at)];
}

/** Ease a 0–1 ramp so the crossing starts and ends softly. */
function smooth(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export default function SiteBackground() {
  const pathname = usePathname();
  const order = useMemo(() => orderFor(pathname), [pathname]);

  const videos = useRef(new Map<string, HTMLVideoElement>());
  const frost = useRef<HTMLDivElement>(null);

  // The handover: which clip is showing, how the others sit behind it, and how
  // much the frost thickens at the seam.
  useEffect(() => {
    const pane = frost.current;
    const clips = order
      .map((name) => videos.current.get(name))
      .filter((v): v is HTMLVideoElement => Boolean(v));
    if (!pane || clips.length < 2) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (still) {
      // No crossings and no playback: the opening clip holds its first frame.
      clips.forEach((clip, i) => {
        clip.style.opacity = i === 0 ? '1' : '0';
      });
      return;
    }

    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let scrolling = false;

    const place = () => {
      frame = 0;

      const travel = document.documentElement.scrollHeight - window.innerHeight;
      // A page too short to scroll never gets past its opening clip.
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;

      // One continuous position along the chain: 0 is the first clip, 1 the
      // second, and the half-way points are the crossings.
      const at = progress * (clips.length - 1);

      // Only ever two clips at once: the one underneath stays fully opaque and
      // the one above fades in over it. Cross-fading both at partial opacity
      // would let the paper through at the seam and flash the page white.
      const under = Math.min(clips.length - 2, Math.max(0, Math.floor(at)));
      const over = smooth(at - under);

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        const opacity = i === under ? 1 : i === under + 1 ? over : 0;

        clip.style.opacity = `${opacity}`;
        // Furthest from its moment is furthest back, so the clip coming in
        // settles forward while the one leaving drifts away behind it.
        const distance = Math.min(1, Math.abs(at - i));
        clip.style.transform = `scale(${1 + DRIFT * distance})`;

        // Decode only what is actually on screen, and only while moving.
        if (opacity > 0.01 && scrolling) {
          if (clip.paused) void clip.play().catch(() => {});
        } else if (!clip.paused) {
          clip.pause();
        }
      }

      // The breath at the seam: strongest exactly between two clips, gone by
      // the time either one has the screen to itself.
      const crossing = 1 - Math.abs((at % 1) * 2 - 1);
      const eased = smooth(crossing);
      // The script owns the breath; how thick the pane is to begin with is a
      // calibration, and belongs in CSS where it can differ per screen.
      pane.style.setProperty('--breath', `${eased}`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    const settle = () => {
      scrolling = false;
      schedule();
    };

    const onScroll = () => {
      scrolling = true;
      clearTimeout(idle);
      // Long enough to ride out the gap between two flicks of a trackpad, short
      // enough that the picture settles as soon as the reader does.
      idle = setTimeout(settle, 400);
      schedule();
    };

    const onVisibility = () => {
      if (!document.hidden) return;
      clearTimeout(idle);
      settle();
    };

    place();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [order]);

  // The pointer opens a soft hole in the frost: where you are looking the blur
  // lifts and the picture comes through.
  useEffect(() => {
    const pane = frost.current;
    if (!pane) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const move = (event: PointerEvent) => {
      // The pane is fixed, so viewport coordinates are already its own.
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pane.style.setProperty('--px', `${x}px`);
        pane.style.setProperty('--py', `${y}px`);
        pane.dataset.pointer = 'on';
      });
    };

    const leave = () => {
      delete pane.dataset.pointer;
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div aria-hidden className="site-bg">
      <div className="site-bg-stage">
        {order.map((name) => (
          <BackgroundVideo
            key={name}
            name={name}
            ref={(node) => {
              if (!node) return;
              videos.current.set(name, node);
              return () => videos.current.delete(name);
            }}
          />
        ))}
      </div>
      <div ref={frost} className="site-frost" />
      {/* The calm ground under the text, no wider than the text itself. */}
      <div className="site-column" />
      {/* A breath of ink at the edges, so the page has a shape rather than
          washing out into the browser chrome. */}
      <div className="site-vignette" />
    </div>
  );
}
