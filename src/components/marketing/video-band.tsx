import type { ReactNode } from 'react';
import BackgroundVideo from './background-video';

/**
 * A band whose backdrop is a clip that plays only while it is on screen.
 *
 * The clip sits under two scrims — a flat wash and a vertical fade — so the
 * type keeps its contrast against moving footage and the band dissolves into
 * the paper above and below it rather than ending on a hard edge.
 */
export default function VideoBand({
  name,
  children,
  className = '',
}: {
  /** Base file name in /public/video, without extension. */
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      <BackgroundVideo
        name={name}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.34]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-paper/45 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-paper via-transparent to-paper"
      />
      {children}
    </section>
  );
}
