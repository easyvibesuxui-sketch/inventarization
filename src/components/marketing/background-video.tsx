"use client";

import { useEffect, useRef } from "react";

/**
 * Playback is gated on the visitor actually having scrolled.
 *
 * An IntersectionObserver on its own is not enough: a band that fills the first
 * screen is already intersecting at first paint, so the clip starts the moment
 * the page loads — which is autoplay by any other name. This module-level latch
 * flips on the first real scroll gesture and never flips back, so every clip on
 * the page waits for it and then behaves as "plays while on screen".
 */
let hasScrolled = false;
const waiting = new Set<() => void>();

function watchForScroll() {
  if (typeof window === "undefined" || hasScrolled) return;

  const unlock = () => {
    // A restored scroll position (back button, or a #hash) fires a scroll event
    // without the visitor having touched anything, so require actual travel.
    if (window.scrollY < 24) return;
    hasScrolled = true;
    window.removeEventListener("scroll", unlock);
    for (const notify of waiting) notify();
    waiting.clear();
  };

  window.addEventListener("scroll", unlock, { passive: true });
}

export default function BackgroundVideo({
  name,
  className = "",
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;

    const sync = () => {
      if (onScreen && hasScrolled) {
        // Autoplay policies still reject a muted play() in some states; the
        // poster stays up, which is a perfectly good outcome.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    watchForScroll();
    if (!hasScrolled) waiting.add(sync);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    // A clip playing in a tab nobody is looking at is wasted battery.
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      waiting.delete(sync);
      document.removeEventListener("visibilitychange", onVisibility);
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
