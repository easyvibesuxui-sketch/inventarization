import type { ElementType, ReactNode } from 'react';

/**
 * Load-in animation for above-the-fold content.
 *
 * Unlike `Reveal`, this needs no JavaScript: it is a pure CSS animation that
 * starts on first paint. The hero must never wait for hydration to become
 * visible — that would hide the largest element on the page for as long as the
 * bundle takes to arrive.
 */
export default function Rise({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
}) {
  return (
    <Tag
      className={`rise ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
