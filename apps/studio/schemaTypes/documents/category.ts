import {defineArrayMember, defineField, defineType} from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título da página',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descrição da página',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Seções da categoria',
      type: 'array',
      of: [
        defineArrayMember({type: 'curatedPostsSection'}),
        defineArrayMember({type: 'richTextSection'}),
        defineArrayMember({type: 'ctaBanner'}),
      ],
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordem na home',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Ordem da home',
      name: 'homeOrderAsc',
      by: [
        {field: 'homeOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});