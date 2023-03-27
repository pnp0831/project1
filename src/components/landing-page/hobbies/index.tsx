import styles from './hobbies.module.scss';
import Carousel from '~/components/landing-page/carousel';
import Image from 'next/image';

const ITEMS = [
  {
    name: 'basketball',
    image: '/nba.jfif',
  },
  {
    name: 'ESports',
    image: '/cktg.jpg',
  },
  {
    name: 'Movie',
    image: '/dark.jpg',
  },
  {
    name: 'Music',
    image: '/music.jfif',
  },
  {
    name: 'Read',
    image: '/read.jfif',
  },
  {
    name: 'Travel',
    image: '/travel.jpg',
  },
];

const Hobbies = () => {
  return (
    <section className={styles.hobbies}>
      <Carousel className={styles.carousel}>
        {ITEMS.map((item) => {
          return (
            <div key={item.name} className={styles.item}>
              <div style={{ overflow: 'hidden' }}>
                <Image src={item.image} alt={item.name} width={440} height={260} loading="lazy" />
                <h5 className={styles.content}>{item.name}</h5>
                <div className={styles.overlay} />
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default Hobbies;
