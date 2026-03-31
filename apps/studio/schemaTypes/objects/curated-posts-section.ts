import {defineField, defineType} from 'sanity';

export const curatedPostsSectionType = defineType({
  name: 'curatedPostsSection',
  title: 'Bloco de posts curados',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Comece por aqui',
      description: 'Texto curto acima do título da seção.',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título principal do bloco na Home.',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      description: 'Texto de apoio logo abaixo do título.',
      validation: (rule) => rule.required().min(10).max(280),
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      description:
        'Selecione os posts que serão exibidos neste bloco da Home. Esta seção apenas exibe posts e não controla envio de newsletter.',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Texto do botão',
      type: 'string',
      description: 'Opcional. Ex.: Ver todos os posts',
      initialValue: 'Ver todos os posts',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'buttonHref',
      title: 'Link do botão',
      type: 'string',
      description:
        'Opcional. Use link interno como /posts. Este botão apenas navega e não envia newsletter.',
      initialValue: '/posts',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return true;
          }

          if (typeof value === 'string' && value.startsWith('/')) {
            return true;
          }

          return 'Use um link interno começando com "/". Ex.: /posts';
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      posts: 'posts',
    },
    prepare(selection) {
      const totalPosts = Array.isArray(selection.posts) ? selection.posts.length : 0;

      return {
        title: selection.title || 'Bloco de posts curados',
        subtitle: `Home · ${totalPosts} post(s) selecionado(s)`,
      };
    },
  },
});