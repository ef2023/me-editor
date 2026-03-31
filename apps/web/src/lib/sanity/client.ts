import {createClient} from 'next-sanity';
import {sanityEnv} from './env';

export const client = createClient({
  projectId: sanityEnv.projectId ?? 'missing-project-id',
  dataset: sanityEnv.dataset ?? 'missing-dataset',
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
  perspective: 'published',
});
