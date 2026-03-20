import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Título do site',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Mistério do Evangelho',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Entender a Bíblia com clareza. Viver o Evangelho com verdade.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição institucional',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título principal da home',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descrição principal da home',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Descrição do rodapé',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações do site',
        subtitle: 'Singleton editorial',
      };
    },
  },
});