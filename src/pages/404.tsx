import Head from 'next/head';
import { useEffect } from 'react';
import SomethingWrong from '~/components/something-wrong';
import { useAppContext } from '~/contexts/AppContext';

export default function Page404() {
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle('Error');
    return () => {
      setTitle();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Something Went Wrong</title>
      </Head>
      <SomethingWrong />
    </>
  );
}
