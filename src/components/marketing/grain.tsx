/**
 * Film grain over the whole page.
 *
 * The noise is an inline SVG turbulence filter rather than an image: it costs no
 * request, tiles without a seam, and stays crisp on any display density. It sits
 * above the content but ignores pointer events, and is hidden from assistive
 * tech — it carries no meaning.
 */
export default function Grain() {
  return <div className="grain" aria-hidden />;
}
