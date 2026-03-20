import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    siteSettings: defineLocations({
      select: {
        title: 'siteTitle',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Home',
            href: '/',
          },
        ],
      }),
    }),
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        categorySlug: 'category->slug.current',
      },
      resolve: (doc) => ({
        locations:
          doc?.slug && doc?.categorySlug
            ? [
                {
                  title: doc?.title || 'Post',
                  href: `/${doc.categorySlug}/${doc.slug}`,
                },
                {
                  title: 'Categoria',
                  href: `/${doc.categorySlug}`,
                },
                {
                  title: 'Home',
                  href: '/',
                },
              ]
            : [],
      }),
    }),
    category: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc?.title || 'Categoria',
                href: `/${doc.slug}`,
              },
              {
                title: 'Home',
                href: '/',
              },
            ]
          : [],
      }),
    }),
    author: defineLocations({
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc?.name || 'Autor',
                href: `/autor/${doc.slug}`,
              },
              {
                title: 'Home',
                href: '/',
              },
            ]
          : [],
      }),
    }),
    legalPage: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc?.title || 'Página institucional',
                href: `/${doc.slug}`,
              },
              {
                title: 'Home',
                href: '/',
              },
            ]
          : [],
      }),
    }),
  },
};