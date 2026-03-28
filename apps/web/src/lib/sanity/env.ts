export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'g6fc3waj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-03-01',
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333',
  viewerToken: process.env.SANITY_VIEWER_TOKEN,
  revalidateSecret: process.env.SANITY_REVALIDATE_SECRET,
};

export const hasSanityEnv = Boolean(sanityEnv.projectId && sanityEnv.dataset);
export const hasViewerToken = Boolean(sanityEnv.viewerToken);
