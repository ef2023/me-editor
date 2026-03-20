import {defineConfig} from 'sanity';
import {visionTool} from '@sanity/vision';
import {presentationTool} from 'sanity/presentation';
import {structureTool} from 'sanity/structure';
import {structure} from './structure';
import {resolve} from './presentation/resolve';
import {schemaTypes} from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'g6fc3waj';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

const previewOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://misterio-do-evangelho.vercel.app';

const singletonTypes = new Set(['siteSettings', 'homePage']);

export default defineConfig({
  name: 'default',
  title: 'Mistério do Evangelho',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [previewOrigin, 'http://localhost:*'],
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') {
        return prev;
      }

      return prev.filter(
        (templateItem) => !singletonTypes.has(templateItem.templateId),
      );
    },
    actions: (prev, context) => {
      if (!singletonTypes.has(context.schemaType)) {
        return prev;
      }

      return prev.filter(
        (action) =>
          action.action !== 'duplicate' &&
          action.action !== 'delete' &&
          action.action !== 'unpublish',
      );
    },
  },
});