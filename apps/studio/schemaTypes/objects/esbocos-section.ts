import {defineArrayMember, defineField, defineType} from 'sanity';

export const esbocosSectionType = defineType({
  name: 'esbocosSection',
  title: 'Bloco de esboços bíblicos',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Esboços bíblicos',
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
      title: 'Esboços em destaque',
      type: 'array',
      of: [defineArrayMember({type: 'esbocoHomeItem'})],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Bloco de esboços bíblicos',
        subtitle: 'Home',
      };
    },
  },
});