import {authorType} from './documents/author';
import {categoryType} from './documents/category';
import {esbocoType} from './documents/esboco';
import {homePageType} from './documents/home-page';
import {legalPageType} from './documents/legal-page';
import {newsletterPendingSubscriberType} from './documents/newsletter-pending-subscriber';
import {newsletterSubscriberType} from './documents/newsletter-subscriber';
import {postType} from './documents/post';
import {siteSettingsType} from './documents/site-settings';
import {categoryGridSectionType} from './objects/category-grid-section';
import {ctaBannerType} from './objects/cta-banner';
import {curatedPostsSectionType} from './objects/curated-posts-section';
import {editorialPrincipleType} from './objects/editorial-principle';
import {esbocoHomeItemType} from './objects/esboco-home-item';
import {esbocosSectionType} from './objects/esbocos-section';
import {faqItemType} from './objects/faq-item';
import {faqSectionType} from './objects/faq-section';
import {heroSectionType} from './objects/hero-section';
import {principlesSectionType} from './objects/principles-section';
import {readingPathType} from './objects/reading-path';
import {readingPathsSectionType} from './objects/reading-paths-section';
import {richTextSectionType} from './objects/rich-text-section';
import {seoType} from './objects/seo';

export const schemaTypes = [
  siteSettingsType,
  homePageType,
  categoryType,
  authorType,
  postType,
  esbocoType,
  legalPageType,
  newsletterSubscriberType,
  newsletterPendingSubscriberType,
  seoType,
  ctaBannerType,
  readingPathType,
  editorialPrincipleType,
  heroSectionType,
  curatedPostsSectionType,
  readingPathsSectionType,
  esbocoHomeItemType,
  esbocosSectionType,
  principlesSectionType,
  categoryGridSectionType,
  richTextSectionType,
  faqItemType,
  faqSectionType,
];