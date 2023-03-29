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
import kebabCase from 'lodash/kebabCase';

export default function LandingPage() {
  const a = [
    '//product.hstatic.net/1000096703/product/0_de8e6686dfcb4f448e6a8f2f6b9d88b6_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_c4712fe1949548c2aeba9ceab4aa88c7_grande.jpg',
    '//product.hstatic.net/1000096703/product/0_5491089b87e8412a9fffaf83a0816868_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_e03baafdda0d4529876710d1c04637e9_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_79d22def9b984445944e650813a85c94_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_2ca2e819c6d745c0a2ae6fceeae5269d_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_318ba3d4e5844ff2b91c06e4afddd162_grande.jpg',
    '//product.hstatic.net/1000096703/product/1a_79172668f84b4a7fa4b155254e95f2ef_grande.jpg',
    '//product.hstatic.net/1000096703/product/hma00051_d3b68cb809da407a82349546a742e372_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_6216b4d456574ea68685e637093cfcda_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_dbefd6bd2e144a51aa45f8210b23480f_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_8cd3ca748f86487d934e29d9b9526458_grande.jpg',
    '//product.hstatic.net/1000096703/product/0_4d660837e2b94c56b2cb5f8f0cfe66bd_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_ed86023132064cd58d76bf3476d3c13d_grande.jpg',
    '//product.hstatic.net/1000096703/product/0_d6f18d6876104185a51b20f9ee216c50_grande.jpg',
    '//product.hstatic.net/1000096703/product/1a_636b4b15f3e746968c58616bb7b0f6c4_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_22cc2199d4b44a0395e2ee189e674fe9_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_4200a6df78204dd085f74621d415e3f6_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_b623003a572b4861989646d1e85b4d41_grande.jpg',
    '//product.hstatic.net/1000096703/product/1a_a7b54f303b9a4052bcec57e0da823e60_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_998d1b1df5614234b8117ca109bdaf0f_grande.jpg',
    '//product.hstatic.net/1000096703/product/1a_30b68f8526ca4f7387954ee1f05268eb_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_d86499ebd85d4f85acc8bf5c9b28f769_grande.jpg',
    '//product.hstatic.net/1000096703/product/dsc_0410_de37dbb5891a4d9aabff14c0357353ff_grande.jpg',
    '//product.hstatic.net/1000096703/product/1_b5787a4779b64e40aba8b21545858782_grande.jpg',
    '//product.hstatic.net/1000096703/product/2_b7b50160001341d2b271f32e1701265a_grande.jpg',
  ];

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const jacket = a.map((item, index) => {
    const name = `Jacket #${index + 1}`;

    return {
      id: index + 1,
      createdAt: '2023-03-21T05:21:13.990Z',
      name,
      slug: kebabCase(name),
      price: randomIntFromInterval(100000, 500000),
      image: `https:${item}`,
      category: 'jacket',
    };
  });

  return (
    <>
      <Head>
        <title>Landing Page</title>
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
