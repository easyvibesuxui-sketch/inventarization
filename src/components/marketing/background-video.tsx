"use client";

import { useEffect, useRef } from "react";

/**
 * A muted clip that runs only while the page is being scrolled.
 *
 * There is no `autoplay` attribute and nothing calls `play()` on mount, so it
 * cannot start on its own: the first scroll starts it, and it stops again
 * shortly after the scrolling does. Standing still, the picture holds a frame.
 *
 * Reduced motion never starts it at all, and a hidden tab stops it — the poster
 * carries the first frame either way, so the backdrop is never empty.
 */
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

    let idle: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      video.pause();
    };

    const onScroll = () => {
      // Autoplay policies still reject a muted play() in some states; the
      // poster stays up, which is a perfectly good outcome.
      if (video.paused) void video.play().catch(() => {});
      clearTimeout(idle);
      // Long enough to ride out the gap between two flicks of a trackpad, short
      // enough that the picture settles as soon as the reader does.
      idle = setTimeout(stop, 400);
    };

    const onVisibility = () => {
      if (document.hidden) {
        clearTimeout(idle);
        stop();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [name]);

  return (
    <video
      ref={ref}
      key={name}
      poster={`/video/${name}-poster.jpg`}
      muted
      loop
      playsInline
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
