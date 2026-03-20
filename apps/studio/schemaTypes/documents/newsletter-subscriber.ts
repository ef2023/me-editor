import {defineField, defineType} from 'sanity';

export const newsletterSubscriberType = defineType({
  name: 'newsletterSubscriber',
  title: 'Inscrito da newsletter',
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
      initialValue: 'active',
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Solicitado em',
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