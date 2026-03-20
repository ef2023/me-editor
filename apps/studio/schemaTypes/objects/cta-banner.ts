import {defineField, defineType} from 'sanity';

export const ctaBannerType = defineType({
  name: 'ctaBanner',
  title: 'CTA editorial',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Continue acompanhando',
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
      name: 'buttonLabel',
      title: 'Texto do botão',
      type: 'string',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Link do botão',
      type: 'string',
    }),
    defineField({
      name: 'showNewsletterForm',
      title: 'Mostrar formulário de newsletter',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'successMessage',
      title: 'Mensagem de sucesso',
      type: 'string',
      initialValue: 'Inscrição realizada com sucesso.',
    }),
  ],
});