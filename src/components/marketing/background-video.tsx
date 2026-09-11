/**
 * One clip in the site's backdrop, in the orientation the screen is shaped for.
 *
 * A 16:9 clip on a phone is not a smaller 16:9 clip — `object-fit: cover` keeps
 * roughly the middle quarter of its width and magnifies it, which throws away
 * the composition and leaves a soft grey field. So each view is shot twice, and
 * a portrait screen is served the portrait cut rather than a crop of the other.
 *
 * Presentation only: no `autoplay`, no effects of its own. Which clip is
 * showing, when it runs and how it hands over is the backdrop's business; see
 * site-background.tsx.
 */
export default function BackgroundVideo({
  name,
  portrait,
  ref,
}: {
  /** Base file name in /public/video, without extension or orientation. */
  name: string;
  /** Serve the portrait cut, for screens taller than they are wide. */
  portrait: boolean;
  ref: (node: HTMLVideoElement | null) => void;
}) {
  const file = portrait ? `${name}-portrait` : name;

  return (
    <video
      ref={ref}
      poster={`/video/${file}-poster.jpg`}
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
      <source src={`/video/${file}.mp4`} type="video/mp4" />
      <source src={`/video/${file}.webm`} type="video/webm" />
    </video>
  );
}
