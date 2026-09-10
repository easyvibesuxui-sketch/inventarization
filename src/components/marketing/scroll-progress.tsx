'use client';

import { useEffect, useRef } from 'react';

/** Hairline reading-progress bar pinned under the header. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      node.style.transform = `scaleX(${progress})`;
    };

    // Coalesce scroll events into one write per frame.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" aria-hidden>
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-accent-600 to-accent-500"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
