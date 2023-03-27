import { useRouter } from 'next/router';
import Button from '../button';
import Container from '../container';
import styles from './something-wrong.module.scss';

const SomethingWrong = () => {
  const router = useRouter();
  return (
    <section className={styles.someThingWrong}>
      <Container>
        <h4>Something went wrong</h4>
        <Button onClick={() => router.push('/')}>GO HOME</Button>
      </Container>
    </section>
  );
};

export default SomethingWrong;
