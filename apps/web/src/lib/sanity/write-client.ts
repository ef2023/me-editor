import {createClient} from '@sanity/client';
import {sanityEnv} from './env';

export const writeClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});