import {HomeSections} from '@/components/home/home-sections'
import {SiteFooter} from '@/components/layout/site-footer'
import {SiteHeader} from '@/components/layout/site-header'

type NewsletterStatus = 'pending' | 'confirmed' | 'invalid' | 'error'

type HomePageProps = {
  searchParams: Promise<{
    newsletter?: string | string[]
  }>
}

function normalizeNewsletterStatus(
  value: string | string[] | undefined,
): NewsletterStatus | undefined {
  const resolved = Array.isArray(value) ? value[0] : value

  if (
    resolved === 'pending' ||
    resolved === 'confirmed' ||
    resolved === 'invalid' ||
    resolved === 'error'
  ) {
    return resolved
  }

  return undefined
}

export default async function HomePage({searchParams}: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const newsletterStatus = normalizeNewsletterStatus(
    resolvedSearchParams.newsletter,
  )

  return (
    <>
      <SiteHeader />
      <main>
        <HomeSections newsletterStatus={newsletterStatus} />
      </main>
      <SiteFooter />
    </>
  )
}