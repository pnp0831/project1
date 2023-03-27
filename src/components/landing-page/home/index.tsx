/* eslint-disable react/no-unescaped-entities */
import Container from '~/components/container';
import styles from './home.module.scss';
import Image from 'next/image';

const Home = () => (
  <section className={styles.home} id="home" data-section>
    <div className={styles.overlay} />
    <Image
      src="/bg-landingpage.jpg"
      alt="bg"
      loading="lazy"
      height={500}
      width={500}
      className={styles.image}
    />
    <Container className={styles.container}>
      <div className={styles.content}>
        <div>Hi, I'm Nguyen Phat</div>
        <div>Web developer</div>
        <div>based in Ho Chi Minh City.</div>
      </div>
    </Container>
  </section>
);

export default Home;
