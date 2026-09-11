'use client';

import { useEffect, type RefObject } from 'react';

/**
 * A background clip whose playhead is the scroll position.
 *
 * It never plays. `play()` is never called and there is no `autoplay`
 * attribute, so there is nothing that can start on its own: the only thing that
 * moves the clip forward is the page moving under it. Scroll down and it
 * advances, scroll up and it runs backwards, stop and it holds the frame.
 *
 * Progress is measured across the whole passage of the band through the
 * viewport — frame one as its top edge appears at the bottom of the screen,
 * the last frame as its bottom edge leaves the top — so the clip is exactly as
 * long as the scroll that reveals it.
 *
 * The clips are encoded with a keyframe every four frames, which is what makes
 * seeking this often cheap enough to do on every frame.
 */
export default function BackgroundVideo({
  name,
  bandRef,
  className = '',
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  /** The band the clip is scrubbed against. */
  bandRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  useEffect(() => {
    const band = bandRef.current;
    const video = band?.querySelector('video');
    if (!band || !video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let duration = 0;
    let frame = 0;

    const seek = () => {
      frame = 0;
      if (!duration) return;

      const rect = band.getBoundingClientRect();
      const scrolled = window.scrollY;
      const top = rect.top + scrolled;

      // Frame one as the band's top edge appears at the bottom of the screen,
      // the last frame as its bottom edge leaves the top. Clamped at zero so a
      // band that is already on screen when the page loads — the hero — starts
      // at frame one rather than part-way through.
      const from = Math.max(0, top - window.innerHeight);
      const to = top + rect.height;
      if (to <= from) return;

      const progress = Math.min(1, Math.max(0, (scrolled - from) / (to - from)));
      // Stop a hair short of the end: seeking to exactly `duration` lands past
      // the last frame, and some browsers answer that by snapping back to zero.
      const time = progress * (duration - 0.05);

      if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };

    const onMetadata = () => {
      duration = video.duration || 0;
      schedule();
    };

    video.addEventListener('loadedmetadata', onMetadata);
    if (video.readyState >= 1) onMetadata();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [bandRef]);

  return (
    <video
      poster={`/video/${name}-poster.jpg`}
      muted
      playsInline
      // Seeking needs the frames already in hand, and the files are small.
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className={className}
    >
      {/* H.264 first: it is the smaller of the two here, and everything the
          site actually ships to decodes it. VP9 covers builds that do not. */}
      <source src={`/video/${name}.mp4`} type="video/mp4" />
      <source src={`/video/${name}.webm`} type="video/webm" />
    </video>
  );
}
