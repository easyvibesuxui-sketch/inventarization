'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted background clip that plays only while it is on screen.
 *
 * There is deliberately no `autoplay` attribute: playback is started by an
 * IntersectionObserver when the band scrolls into view and paused again when it
 * leaves, so a visitor who never reaches the section never decodes a frame.
 *
 * The poster carries the first frame, so the band is never empty — which also
 * makes it the whole treatment for anyone who asked for reduced motion, where
 * playback never starts at all.
 */
export default function BackgroundVideo({
  name,
  className = '',
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const play = () => {
      // Autoplay policies still reject a muted play() in some states; the poster
      // stays up, which is a perfectly good outcome.
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    // A clip playing in a tab nobody is looking at is wasted battery.
    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={`/video/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={className}
    >
      {/* VP9 first: smaller, and the only one plain Chromium builds decode.
          H.264 is the fallback for Safari and anything without VP9. */}
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
