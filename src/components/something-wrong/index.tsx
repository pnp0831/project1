import { useRouter } from 'next/router';
import { APP_ROUTE } from '~/constants';
import { useAppContext } from '~/contexts/AppContext';
import Button from '../button';
import Container from '../container';
import styles from './something-wrong.module.scss';

const SomethingWrong = () => {
  const router = useRouter();
  const { headers } = useAppContext();

  const url = router.asPath.startsWith(APP_ROUTE.ECOMMERCE)
    ? `${APP_ROUTE.ECOMMERCE}/${headers?.[0]?.slug}`
    : APP_ROUTE.HOME;

  return (
    <section className={styles.someThingWrong}>
      <Container>
        <h4>Something went wrong</h4>
        <Button onClick={() => router.push(url)}>GO HOME</Button>
      </Container>
    </section>
  );
};

export default SomethingWrong;
