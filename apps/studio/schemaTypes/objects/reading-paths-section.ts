import {defineArrayMember, defineField, defineType} from 'sanity';

export const readingPathsSectionType = defineType({
  name: 'readingPathsSection',
  title: 'Bloco de percursos',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Percursos de leitura',
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
      name: 'paths',
      title: 'Percursos',
      type: 'array',
      of: [defineArrayMember({type: 'readingPath'})],
      validation: (rule) => rule.max(8),
    }),
  ],
});