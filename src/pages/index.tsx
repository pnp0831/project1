import Head from 'next/head';
import Container from '~/components/container';
import AboutMe from '~/components/landing-page/about-me';
import Experience from '~/components/landing-page/experience';
import Hobbies from '~/components/landing-page/hobbies';
import Home from '~/components/landing-page/home';
import PreviousProjects from '~/components/landing-page/previoues-projects';
import ScrollSpy from '~/components/landing-page/scrollspy';
import SectionTitle from '~/components/landing-page/section-title';
import ScrollToTop from '~/components/scroll-to-top';
import { MAIN_MENU } from '~/constants';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Landing Page" unique="true" />
      </Head>
      <ScrollSpy headerSelector={MAIN_MENU.filter((i) => !i.url).map((i) => `menu-${i.id}`)}>
        <Home />
        <section id="about-me" data-section>
          <SectionTitle text="About Me" desc="Know me more" />
          <Container>
            <AboutMe />
          </Container>
        </section>
        <section className="even" id="experience" data-section>
          <SectionTitle text="experience" desc="My Works" />
          <Container>
            <Experience />
          </Container>
        </section>
        <section id="previous-projects" data-section>
          <SectionTitle text="Previous Projects" desc="My Projects" />
          <Container>
            <PreviousProjects />
          </Container>
        </section>
        <section className="even" id="hobbies" data-section>
          <SectionTitle text="Hobbies" desc="Hobbies" />
          <Container>
            <Hobbies />
          </Container>
        </section>
      </ScrollSpy>
      <ScrollToTop />
    </>
  );
}
