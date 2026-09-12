import type { ReactNode } from 'react';
import BandVideo from './band-video';

export type Tone = 'paper' | 'sunk' | 'ink';

/**
 * One section, standing on one of the three grounds.
 *
 * The variation across a page is carried here rather than by anything inside:
 * a section says which ground it is on and the ramp inverts under it, so the
 * blocks it contains do not each have to know where they landed.
 *
 * `video` puts a clip behind the section under a scrim. `autoplay` is for the
 * hero's accent graphic only; every other clip waits to be scrolled to.
 */
export default function Section({
  id,
  tone = 'paper',
  video,
  autoplay,
  rules = true,
  className = '',
  children,
}: {
  id?: string;
  tone?: Tone;
  /** Base file name in /public/video, without extension or orientation. */
  video?: string;
  autoplay?: boolean;
  /** The drawn column grid. Off for sections that carry their own figure. */
  rules?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`tone-${tone} relative isolate overflow-hidden border-t border-rule ${className}`}
    >
      {video && (
        <>
          <BandVideo name={video} autoplay={autoplay} />
          <div aria-hidden className="band-scrim" />
        </>
      )}
      {rules && (
        <div aria-hidden className="grid-rules">
          <span />
          <span />
          <span />
          <span className="hidden md:block" />
          <span className="hidden md:block" />
          <span className="hidden md:block" />
        </div>
      )}
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36">{children}</div>
    </section>
  );
}
