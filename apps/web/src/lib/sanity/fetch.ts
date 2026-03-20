import {client} from './client';
import {sanityEnv} from './env';
import {token} from './token';

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
  stega?: boolean;
  perspective?: 'published' | 'drafts' | 'raw';
  draftModeEnabled?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  stega: stegaOverride,
  perspective: perspectiveOverride,
  draftModeEnabled = false,
}: SanityFetchOptions): Promise<{data: T}> {
  const perspective =
    perspectiveOverride ?? (draftModeEnabled ? 'drafts' : 'published');
  const stega = stegaOverride ?? draftModeEnabled;
  const useCdn = !draftModeEnabled;

  if (draftModeEnabled && !token) {
    throw new Error(
      'Draft Mode ativado, mas SANITY_VIEWER_TOKEN não foi definido no ambiente.',
    );
  }

  const data = await client
    .withConfig({
      useCdn,
      stega: stega ? {studioUrl: sanityEnv.studioUrl} : false,
    })
    .fetch<T>(query, params, {
      token: draftModeEnabled ? token : undefined,
      perspective,
      next: {
        revalidate: draftModeEnabled ? 0 : tags.length ? false : revalidate,
        tags: draftModeEnabled ? [] : tags,
      },
    });

  return {data};
}