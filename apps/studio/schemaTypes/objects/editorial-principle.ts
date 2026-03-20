import {defineField, defineType} from 'sanity';

export const editorialPrincipleType = defineType({
  name: 'editorialPrinciple',
  title: 'Princípio editorial',
  type: 'object',
  fields: [
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
  ],
});