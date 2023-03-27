/* eslint-disable react/no-unescaped-entities */
import useWindowSize from '~/hooks/useWindowResize';
import styles from './about-me.module.scss';

const INFOS = [
  { title: 'Name', text: 'Pham Nguyen Phat' },
  { title: 'Email', text: 'pnp0831@gmail.com' },
  { title: 'DOB', text: '31 Aug 1997' },
  { title: 'From', text: 'Ho Chi Minh City, Viet Nam' },
];

const AboutMe = () => {
  const [windowType] = useWindowSize();

  const renderItem = (item) => {
    return (
      <div key={item.title}>
        <h6 className={styles.title}>{item.title}:</h6>
        <h6 className={styles.name}>{item.text}</h6>
      </div>
    );
  };

  return (
    <section className={styles.aboutMe}>
      <div className={styles.content}>
        <div className={styles.about}>
          <h4>Hi, I'm Nguyen Phat</h4>
          <div className="body1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book
          </div>
        </div>

        {windowType.isTable ? (
          <>
            <div className={styles.info}>
              {INFOS.map((item, index) => index < 2 && renderItem(item))}
            </div>

            <div className={styles.info}>
              {INFOS.map((item, index) => index >= 2 && renderItem(item))}
            </div>
          </>
        ) : (
          <div className={styles.info}>{INFOS.map((item) => renderItem(item))}</div>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
