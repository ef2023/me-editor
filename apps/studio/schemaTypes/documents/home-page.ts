import {defineArrayMember, defineField, defineType} from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Seções da home',
      type: 'array',
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'curatedPostsSection'}),
        defineArrayMember({type: 'readingPathsSection'}),
        defineArrayMember({type: 'principlesSection'}),
        defineArrayMember({type: 'categoryGridSection'}),
        defineArrayMember({type: 'ctaBanner'}),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
        subtitle: 'Singleton modular',
      };
    },
  },
});