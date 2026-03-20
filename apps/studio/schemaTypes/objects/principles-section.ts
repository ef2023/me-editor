import {defineArrayMember, defineField, defineType} from 'sanity';

export const principlesSectionType = defineType({
  name: 'principlesSection',
  title: 'Bloco de princípios editoriais',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Compromissos editoriais',
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
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [defineArrayMember({type: 'editorialPrinciple'})],
      validation: (rule) => rule.max(8),
    }),
  ],
});