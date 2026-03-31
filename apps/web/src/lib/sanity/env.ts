function optionalEnv(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export const sanityEnv = {
  projectId: optionalEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: optionalEnv('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-03-01',
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333',
  viewerToken: optionalEnv('SANITY_VIEWER_TOKEN'),
  revalidateSecret: optionalEnv('SANITY_REVALIDATE_SECRET'),
};

export const hasSanityEnv = Boolean(sanityEnv.projectId && sanityEnv.dataset);
export const hasViewerToken = Boolean(sanityEnv.viewerToken);
