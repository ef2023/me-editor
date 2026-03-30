import {defineField, defineType} from 'sanity';

export const curatedPostsSectionType = defineType({
  name: 'curatedPostsSection',
  title: 'Bloco de posts curados',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Comece por aqui',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texto do botão',
      type: 'string',
      initialValue: 'Ver todos os posts',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Link do botão',
      type: 'string',
      initialValue: '/posts',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Bloco de posts curados',
        subtitle: 'Home',
      };
    },
  },
});