import Image, {type ImageProps} from 'next/image'
import type {SanityImageValue} from '@/lib/content-source'

type SanityImageProps = Omit<ImageProps, 'src'> & {
  image?: SanityImageValue
}

function buildSanityImageUrl(baseUrl: string, width: number, height: number) {
  const url = new URL(baseUrl)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(width))
  url.searchParams.set('h', String(height))
  return url.toString()
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  ...props
}: SanityImageProps) {
  const baseUrl = image?.asset?.url

  if (!baseUrl) {
    return null
  }

  if (typeof width !== 'number' || typeof height !== 'number') {
    return null
  }

  const src = buildSanityImageUrl(baseUrl, width, height)

  return (
    <Image
      src={src}
      alt={alt || image?.alt || 'Imagem do conteúdo'}
      width={width}
      height={height}
      {...props}
    />
  )
}