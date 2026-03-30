import {defineField, defineType} from 'sanity';

export const esbocoHomeItemType = defineType({
  name: 'esbocoHomeItem',
  title: 'Item de esboço da home',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Número/ordem',
      type: 'string',
      initialValue: '01',
    }),
    defineField({
      name: 'title',
      title: 'Título customizado',
      type: 'string',
      description: 'Opcional. Se vazio, usa o título do esboço.',
    }),
    defineField({
      name: 'description',
      title: 'Descrição customizada',
      type: 'text',
      rows: 3,
      description: 'Opcional. Se vazio, usa o resumo do esboço.',
    }),
    defineField({
      name: 'esboco',
      title: 'Esboço',
      type: 'reference',
      to: [{type: 'esboco'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      step: 'step',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Item de esboço',
        subtitle: selection.step || 'Sem ordem',
      };
    },
  },
});