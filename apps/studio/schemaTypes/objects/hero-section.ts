import {defineField, defineType} from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Bloco Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Portal cristão editorial',
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredPost',
      title: 'Post em destaque',
      type: 'reference',
      to: [{type: 'post'}],
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Texto do botão principal',
      type: 'string',
      initialValue: 'Conhecer o projeto',
    }),
    defineField({
      name: 'primaryHref',
      title: 'Link do botão principal',
      type: 'string',
      initialValue: '/sobre',
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Texto do botão secundário',
      type: 'string',
      initialValue: 'Buscar conteúdos',
    }),
    defineField({
      name: 'secondaryHref',
      title: 'Link do botão secundário',
      type: 'string',
      initialValue: '/busca',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Bloco Hero',
        subtitle: 'Home',
      };
    },
  },
});