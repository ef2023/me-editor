import type {Metadata} from 'next';
import {stegaClean} from 'next-sanity';
import {siteConfig} from '@/lib/site';

type SeoPageType = 'website' | 'article' | 'profile';

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  type?: SeoPageType;
};

function normalizePath(path: string) {
  if (!path) {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function absoluteUrl(path = '/') {
  const normalizedBase = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = normalizePath(path);

  return `${normalizedBase}${normalizedPath}`;
}

export function buildMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const safeTitle = stegaClean(title);
  const safeDescription = stegaClean(description);
  const canonical = absoluteUrl(path);

  return {
    title: safeTitle,
    description: safeDescription,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'pt_BR',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDescription,
    },
  };
}