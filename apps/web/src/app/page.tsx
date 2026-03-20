import {HomeSections} from '@/components/home/home-sections';
import {SiteFooter} from '@/components/layout/site-footer';
import {SiteHeader} from '@/components/layout/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}