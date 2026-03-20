import {defineField, defineType} from 'sanity';

export const readingPathType = defineType({
  name: 'readingPath',
  title: 'Percurso de leitura',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Passo',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'post',
      title: 'Post vinculado',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (rule) => rule.required(),
    }),
  ],
});