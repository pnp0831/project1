/* eslint-disable react/no-unescaped-entities */
import Container from '~/components/container';
import styles from './section-title.module.scss';

type Props = {
  text: string;
  desc: string;
};

const SectionTitle = (props: Props) => (
  <section className={styles.sectionTitle}>
    <Container>
      <div className={styles.content}>
        <div className={styles.text}>{props.text}</div>
        <h6 className={styles.desc}>{props.desc}</h6>
      </div>
    </Container>
  </section>
);

export default SectionTitle;
