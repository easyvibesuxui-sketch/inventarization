'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A clip behind one section, in the orientation the screen is shaped for.
 *
 * Two behaviours, because the hero and the rest of the page want different
 * things. The hero's clip is an abstract accent graphic and starts on its own,
 * which is what `autoplay` is for. Every clip below the fold waits for the
 * reader to scroll and stops again when they stop, so a visitor who never gets
 * there never decodes a frame.
 *
 * A 16:9 clip on a phone is not a smaller 16:9 clip — `object-fit: cover` keeps
 * roughly the middle quarter of its width and magnifies it, throwing away the
 * composition. Each clip is cut both ways and the screen picks.
 */
export default function BandVideo({
  name,
  autoplay = false,
  orientation = 'auto',
  className = '',
}: {
  /** Base file name in /public/video, without extension or orientation. */
  name: string;
  /** Start on load rather than waiting for a scroll. For the hero only. */
  autoplay?: boolean;
  /**
   * 'auto' matches the clip to the shape of the screen, which is what a
   * full-bleed backdrop wants. 'landscape' pins it, for a clip held in a box
   * of its own whose shape does not follow the screen's.
   */
  orientation?: 'auto' | 'landscape';
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Null until measured, and nothing is rendered before then: rendering a guess
  // first makes a phone fetch one set, throw it away on hydration and fetch the
  // other — two payloads on the connection least able to afford one.
  const [measured, setMeasured] = useState<boolean | null>(null);

  // A pinned clip needs no measuring, so it is known at render rather than set
  // from an effect after one.
  const portrait = orientation === 'landscape' ? false : measured;

  useEffect(() => {
    if (orientation === 'landscape') return;

    const query = window.matchMedia('(max-aspect-ratio: 1 / 1)');
    const sync = () => setMeasured(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [orientation]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let onScreen = false;
    let idle: ReturnType<typeof setTimeout> | undefined;

    // Autoplay policies still reject a muted play() in some states; the poster
    // stays up, which is a perfectly good outcome.
    const start = () => void video.play().catch(() => {});

    if (autoplay) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else video.pause();
      });
      observer.observe(video);
      return () => observer.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (!onScreen) video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    const onScroll = () => {
      if (!onScreen) return;
      if (video.paused) start();
      clearTimeout(idle);
      // Long enough to ride out the gap between two flicks of a trackpad, short
      // enough that the picture settles as soon as the reader does.
      idle = setTimeout(() => video.pause(), 400);
    };

    const onVisibility = () => {
      if (document.hidden) video.pause();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [autoplay, portrait]);

  if (portrait === null) return null;

  const file = portrait ? `${name}-portrait` : name;

  return (
    <video
      ref={ref}
      key={file}
      poster={`/video/${file}-poster.jpg`}
      muted
      loop
      playsInline
      // Deliberately no `autoPlay` attribute, even for the hero: the browser
      // honours it before any script runs, so a reader who asked for reduced
      // motion would get the animation anyway. The effect starts it instead,
      // and that path is gated on the preference.
      preload={autoplay ? 'auto' : 'metadata'}
      aria-hidden
      tabIndex={-1}
      className={`band-video ${className}`}
    >
      {/* H.264 first: it is the smaller of the two here, and everything the
          site actually ships to decodes it. VP9 covers builds that do not. */}
      <source src={`/video/${file}.mp4`} type="video/mp4" />
      <source src={`/video/${file}.webm`} type="video/webm" />
    </video>
  );
}
