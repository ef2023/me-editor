import {defineQuery} from 'next-sanity';

const IMAGE_FIELDS = `
{
  alt,
  crop,
  hotspot,
  asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions{
        width,
        height,
        aspectRatio
      }
    }
  }
}
`;

const AUTHOR_FIELDS = `
{
  name,
  "slug": slug.current,
  role,
  shortBio,
  bio,
  expertise,
  links,
  image ${IMAGE_FIELDS}
}
`;

const SEO_FIELDS = `
{
  title,
  description,
  image ${IMAGE_FIELDS}
}
`;

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  eyebrow,
  pillar,
  featured,
  readingTime,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "updatedAt": coalesce(updatedAt, _updatedAt),
  tags,
  seo ${SEO_FIELDS},
  body,
  coverImage ${IMAGE_FIELDS},
  "categorySlug": category->slug.current,
  "author": author->${AUTHOR_FIELDS}
`;

const ESBOCO_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  eyebrow,
  pillar,
  bibleText,
  readingTime,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "updatedAt": coalesce(updatedAt, _updatedAt),
  tags,
  seo ${SEO_FIELDS},
  body,
  "author": author->${AUTHOR_FIELDS}
`;

const CATEGORY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  eyebrow,
  heroTitle,
  heroDescription,
  seo ${SEO_FIELDS},
  "sections": sections[]{
    _type,
    _key,
    eyebrow,
    title,
    description,
    buttonLabel,
    buttonHref,
    showNewsletterForm,
    successMessage,
    "posts": posts[]->{
      ${POST_FIELDS}
    },
    body,
    items
  },
  homeOrder
`;

export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)]
  | order(homeOrder asc, title asc){
    ${CATEGORY_FIELDS}
  }
`);

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    ${CATEGORY_FIELDS}
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(category->slug.current)]
  | order(featured desc, publishedAt desc, _updatedAt desc){
    ${POST_FIELDS}
  }
`);

export const allEsbocosQuery = defineQuery(`
  *[_type == "esboco" && defined(slug.current)]
  | order(publishedAt desc, _updatedAt desc){
    ${ESBOCO_FIELDS}
  }
`);

export const esbocoBySlugQuery = defineQuery(`
  *[_type == "esboco" && slug.current == $slug][0]{
    ${ESBOCO_FIELDS}
  }
`);

export const postsByCategoryPageQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    category->slug.current == $category
  ]
  | order(featured desc, publishedAt desc, _updatedAt desc)[$start...$end]{
    ${POST_FIELDS}
  }
`);

export const postsByCategoryCountQuery = defineQuery(`
  count(
    *[
      _type == "post" &&
      defined(slug.current) &&
      category->slug.current == $category
    ]
  )
`);

export const postByCategoryAndSlugQuery = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    category->slug.current == $category
  ][0]{
    ${POST_FIELDS}
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    category->slug.current == $category &&
    slug.current != $slug
  ]
  | order(featured desc, publishedAt desc, _updatedAt desc)[0...$limit]{
    ${POST_FIELDS}
  }
`);

export const allAuthorsQuery = defineQuery(`
  *[_type == "author" && defined(slug.current)]
  | order(name asc){
    name,
    "slug": slug.current,
    role,
    shortBio,
    bio,
    expertise,
    links,
    image ${IMAGE_FIELDS}
  }
`);

export const authorBySlugQuery = defineQuery(`
  *[
    _type == "author" &&
    slug.current == $slug
  ][0]{
    name,
    "slug": slug.current,
    role,
    shortBio,
    bio,
    expertise,
    links,
    image ${IMAGE_FIELDS}
  }
`);

export const postsByAuthorQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    author->slug.current == $slug &&
    defined(category->slug.current)
  ]
  | order(featured desc, publishedAt desc, _updatedAt desc){
    ${POST_FIELDS}
  }
`);

export const legalPageBySlugQuery = defineQuery(`
  *[
    _type == "legalPage" &&
    slug.current == $slug
  ][0]{
    title,
    eyebrow,
    description,
    seo ${SEO_FIELDS},
    "sections": sections[]{
      _type,
      _key,
      eyebrow,
      title,
      description,
      buttonLabel,
      buttonHref,
      showNewsletterForm,
      successMessage,
      body,
      items
    }
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    description,
    heroTitle,
    heroDescription,
    footerDescription
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    "sections": sections[]{
      _type,
      _key,
      eyebrow,
      title,
      description,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref,
      useAllCategories,
      buttonLabel,
      buttonHref,
      showNewsletterForm,
      successMessage,
      "featuredPost": featuredPost->{
        ${POST_FIELDS}
      },
      "posts": posts[]->{
        ${POST_FIELDS}
      },
      "categories": categories[]->{
        ${CATEGORY_FIELDS}
      },
      "paths": paths[]{
        step,
        title,
        description,
        "post": post->{
          ${POST_FIELDS}
        }
      },
      "items": items[]{
        step,
        title,
        description,
        "esboco": esboco->{
          ${ESBOCO_FIELDS}
        }
      }
    }
  }
`);

export const searchPostsPageQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(category->slug.current) &&
    (
      title match $term + "*" ||
      excerpt match $term + "*" ||
      pillar match $term + "*" ||
      count((tags[])[@ match $term + "*"]) > 0
    )
  ]
  | order(featured desc, publishedAt desc, _updatedAt desc)[$start...$end]{
    ${POST_FIELDS}
  }
`);

export const searchPostsCountQuery = defineQuery(`
  count(
    *[
      _type == "post" &&
      defined(slug.current) &&
      defined(category->slug.current) &&
      (
        title match $term + "*" ||
        excerpt match $term + "*" ||
        pillar match $term + "*" ||
        count((tags[])[@ match $term + "*"]) > 0
      )
    ]
  )
`);

export const newsletterPendingByEmailQuery = defineQuery(`
  *[
    _type == "newsletterPendingSubscriber" &&
    email == $email
  ][0]{
    _id,
    email,
    source,
    tokenHash,
    status,
    expiresAt
  }
`);

export const postNewsletterByIdQuery = defineQuery(`
  *[_type == "post" && _id == $id][0]{
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    newsletter{
      sendOnPublish,
      subject,
      teaser,
      sentAt,
      broadcastId
    }
  }
`);
