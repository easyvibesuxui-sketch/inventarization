"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import BackgroundVideo from "./background-video";

/**
 * The site's backdrop: one clip fixed behind every page, running while the
 * reader scrolls.
 *
 * It is fixed rather than per-section, so the footage stays put and the content
 * travels over it. A frosted pane holds it far enough back to read over, and
 * the pointer opens a soft hole in that pane — where you are looking the blur
 * lifts and the picture comes through.
 *
 * Each part of the site gets the clip that belongs to it.
 */
const CLIPS: ReadonlyArray<readonly [test: RegExp, clip: string]> = [
  [/\/services(\/|$)/, "racks"],
  [/\/platform(\/|$)/, "scan"],
];

function clipFor(pathname: string) {
  return CLIPS.find(([test]) => test.test(pathname))?.[1] ?? "aisle";
}

export default function SiteBackground() {
  const frost = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const pane = frost.current;
    if (!pane) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

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
        pane.style.setProperty("--px", `${x}px`);
        pane.style.setProperty("--py", `${y}px`);
        pane.dataset.pointer = "on";
      });
    };

    const leave = () => {
      delete pane.dataset.pointer;
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="site-bg">
      <BackgroundVideo name={clipFor(pathname)} className="site-bg-video" />
      <div ref={frost} className="site-frost" />
      {/* A breath of ink at the edges, so the page has a shape rather than
          washing out into the browser chrome. */}
      <div className="site-vignette" />
    </div>
  );
}
