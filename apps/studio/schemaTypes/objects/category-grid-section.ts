import {defineArrayMember, defineField, defineType} from 'sanity';

export const categoryGridSectionType = defineType({
  name: 'categoryGridSection',
  title: 'Bloco de grade de categorias',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Navegue por assunto',
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
      name: 'useAllCategories',
      title: 'Usar todas as categorias',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'categories',
      title: 'Categorias específicas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'category'}],
        }),
      ],
    }),
  ],
});