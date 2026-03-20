import {defineField, defineType} from 'sanity';

export const newsletterPendingSubscriberType = defineType({
  name: 'newsletterPendingSubscriber',
  title: 'Newsletter pendente',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Origem',
      type: 'string',
      initialValue: 'home',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
    }),
    defineField({
      name: 'tokenHash',
      title: 'Hash do token',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Criado em',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expira em',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'confirmedAt',
      title: 'Confirmado em',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
    },
  },
});