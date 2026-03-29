import {defineArrayMember, defineField, defineType} from 'sanity';

export const esbocoType = defineType({
  name: 'esboco',
  title: 'Esboço bíblico',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().min(8),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 110,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo curto',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Esboço bíblico',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Cluster principal',
      type: 'string',
      initialValue: 'Esboços bíblicos',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bibleText',
      title: 'Texto base',
      type: 'string',
      description: 'Ex.: João 3:16; Jó 19:25; Salmo 23',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Tempo de leitura (minutos)',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(90),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicado em',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Atualizado em',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Título 2', value: 'h2'},
            {title: 'Título 3', value: 'h3'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [{title: 'Lista', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Mais recentes',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'bibleText',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Esboço bíblico',
        subtitle: selection.subtitle || 'Sem texto base',
      };
    },
  },
});