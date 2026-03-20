import {createClient} from 'next-sanity';
import {hasSanityEnv, sanityEnv} from './env';

if (!hasSanityEnv) {
  throw new Error(
    'Variáveis do Sanity ausentes. Preencha NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET.',
  );
}

export const client = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
  perspective: 'published',
});