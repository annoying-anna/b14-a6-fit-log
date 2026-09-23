import { publicPath } from "@/lib/public-path";

type PublicImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** true for above-the-fold art (hero banner, navbar logo) */
  eager?: boolean;
};

/**
 * A plain <img> for the brand files that live in /public.
 *
 * next/image routes local sources through /_next/image, which cannot be
 * combined with a sub-path inside a fully static export, so the logo and the
 * hero banner are served straight from /public instead. The remote workout
 * photos keep using next/image.
 */
export default function PublicImage({
  src,
  alt,
  className,
  width,
  height,
  eager = false,
}: PublicImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see the comment above
    <img
      src={publicPath(src)}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
