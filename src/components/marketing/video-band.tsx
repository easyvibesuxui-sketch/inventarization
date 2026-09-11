import type { ReactNode } from "react";
import BackgroundVideo from "./background-video";

/**
 * A band whose backdrop is a clip that plays only while it is on screen.
 *
 * Three layers sit between the footage and the type. A frost pane blurs and
 * desaturates the clip so it reads as texture behind glass rather than as a
 * video someone left running; a flat wash holds the contrast; a vertical fade
 * dissolves the band into the paper above and below rather than ending on a
 * hard edge.
 *
 * On hover the glass thins — the wash lightens, the blur eases off and the clip
 * comes up — so the footage is legible when you look at it and quiet when you
 * are reading.
 */
export default function VideoBand({
  name,
  children,
  className = "",
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`group relative isolate overflow-hidden ${className}`}>
      <BackgroundVideo
        name={name}
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-[0.42] transition-opacity duration-700 ease-out group-hover:opacity-[0.62]"
      />

      {/* The frost. backdrop-filter acts on everything painted behind it in
          this stacking context, which is exactly the clip and nothing else. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 backdrop-blur-[3px] backdrop-saturate-[0.72] transition-[backdrop-filter] duration-700 ease-out group-hover:backdrop-blur-[1px] group-hover:backdrop-saturate-100"
      />

      {/* The wash, masked so it is weakest at the edges the fade handles. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-paper/55 transition-colors duration-700 ease-out group-hover:bg-paper/30 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
      />

      {/* A breath of ink at the corners, so the pane has a shape instead of
          washing out into the page. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_35%,color-mix(in_srgb,var(--color-ink)_9%,transparent)_100%)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-paper via-transparent to-paper"
      />

      {children}
    </section>
  );
}
