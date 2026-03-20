import {defineArrayMember, defineField, defineType} from 'sanity';

export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'Seção de FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Perguntas frequentes',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [defineArrayMember({type: 'faqItem'})],
      validation: (rule) => rule.min(1),
    }),
  ],
});