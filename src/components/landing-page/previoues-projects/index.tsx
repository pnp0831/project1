import Image from 'next/image';
import Button from '~/components/button';
import styles from './previous-projects.module.scss';

const PROJECTS = [
  {
    name: 'Amazing Circus',
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
  has been the industry's standard dummy text ever since the 1500s`,
    url: 'https://pre-staging-amazingcircus.azureedge.net/?isFun=true',
    image: '/amazing.png',
  },
  {
    name: 'Cho Tot Xe',
    desc: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
  has been the industry's standard dummy text ever since the 1500s`,
    url: 'https://xe.chotot.com/mua-ban-oto-tp-ho-chi-minh',
    image: '/ct-veh.png',
  },
  {
    name: 'El Toro',
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
  has been the industry's standard dummy text ever since the 1500s`,
    url: 'https://pre-staging-eltoro.azureedge.net/?isFun=true',
    image: '/eltoro.png',
  },
];

const PreviousProjects = () => (
  <section className={styles.previousProjects}>
    {PROJECTS.map((item) => (
      <div className={styles.workItem} key={item.name}>
        <Image src={item.image} width={444} height={444} alt={item.name} loading="lazy" />
        <div className={styles.workItemHover}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h5>{item.name}</h5>
            <div className="body3">{item.desc}</div>
            <Button
              className="body1"
              onClick={() => {
                window.open(item.url, '_blank');
              }}
              href={item.url}
              target="_blank"
            >
              DEMO
            </Button>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default PreviousProjects;
