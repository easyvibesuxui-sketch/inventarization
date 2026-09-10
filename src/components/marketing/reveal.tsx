'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * Reveals its children once they scroll into view: fade up out of a slight blur.
 *
 * The transition lives in CSS (`.reveal` / `.is-visible` in globals.css) and
 * this component only toggles the class on the node. Doing that directly rather
 * than through state keeps the reveal out of React's render path entirely — no
 * re-render per element as the page scrolls.
 *
 * It reveals once and then stops observing: re-animating on every pass makes a
 * page feel restless when you scroll back up.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in milliseconds, for items in a row. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anyone who asked for less motion gets the finished state immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.classList.add('is-visible');
        observer.disconnect();
      },
      // Fire a little before the element reaches the fold, so the motion has
      // finished by the time it is properly in view.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
