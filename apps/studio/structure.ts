import type {StructureResolver} from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Configurações do site')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categorias'),
      S.documentTypeListItem('author').title('Autores'),
      S.documentTypeListItem('legalPage').title('Páginas legais'),
      S.documentTypeListItem('newsletterSubscriber').title('Newsletter'),
      S.documentTypeListItem('newsletterPendingSubscriber').title('Newsletter pendente'),
    ]);