import Image from 'next/image';
import type {SanityImageValue} from '@/lib/content-source';
import {urlFor} from '@/lib/sanity/image';

type SanityImageProps = {
  image?: SanityImageValue;
  alt?: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function SanityImage({
  image,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  priority = false,
}: SanityImageProps) {
  if (!image?.asset?.url) {
    return null;
  }

  const src = urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .url();

  const resolvedAlt = alt ?? image.alt ?? '';
  const blurDataURL = image.asset.metadata?.lqip;

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  );
}