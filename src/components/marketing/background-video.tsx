/**
 * One clip in the site's backdrop.
 *
 * Presentation only — no `autoplay`, no effects of its own. Which clip is
 * showing, when it runs and how it hands over to the next is the backdrop's
 * business; see site-background.tsx.
 */
export default function BackgroundVideo({
  name,
  ref,
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  ref: (node: HTMLVideoElement | null) => void;
}) {
  return (
    <video
      ref={ref}
      poster={`/video/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="site-bg-video"
    >
      {/* H.264 first: it is the smaller of the two here, and everything the
          site actually ships to decodes it. VP9 covers builds that do not. */}
      <source src={`/video/${name}.mp4`} type="video/mp4" />
      <source src={`/video/${name}.webm`} type="video/webm" />
    </video>
  );
}
