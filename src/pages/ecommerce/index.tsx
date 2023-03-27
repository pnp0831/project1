import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { APP_ROUTE } from '~/constants';
import { useAppContext } from '~/contexts/AppContext';

const Ecommerce = () => {
  const router = useRouter();

  const { headers } = useAppContext();

  useEffect(() => {
    if (headers.length) {
      const url = `${APP_ROUTE.ECOMMERCE}/${headers?.[0]?.slug}`;
      router.push(url);
    }
  }, [headers]);

  return null;
};

export default Ecommerce;
