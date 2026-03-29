import {defineField, defineType} from 'sanity';

export const esbocoHomeItemType = defineType({
  name: 'esbocoHomeItem',
  title: 'Item de esboço',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Ordem / número',
      type: 'string',
      description: 'Ex.: 01, 02, 03',
    }),
    defineField({
      name: 'title',
      title: 'Título de exibição (opcional)',
      type: 'string',
      description: 'Se vazio, o título do próprio esboço será usado.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição de exibição (opcional)',
      type: 'text',
      rows: 3,
      description: 'Se vazio, o resumo do esboço será usado.',
    }),
    defineField({
      name: 'esboco',
      title: 'Esboço vinculado',
      type: 'reference',
      to: [{type: 'esboco'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      esbocoTitle: 'esboco.title',
      subtitle: 'step',
    },
    prepare(selection) {
      return {
        title: selection.title || selection.esbocoTitle || 'Item de esboço',
        subtitle: selection.subtitle ? `Ordem ${selection.subtitle}` : 'Sem ordem',
      };
    },
  },
});