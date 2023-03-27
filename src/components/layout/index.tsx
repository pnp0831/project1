import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { APP_ROUTE } from '~/constants';
import { useAppContext } from '~/contexts/AppContext';
import { CartContextProvider } from '~/contexts/CartContext';
import Breadcrumb from '../ecommerce/breadcrumb';
import Footer from './footer';
import Header from './header';
import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
  headers: string[];
};

const Layout = ({ headers: initHeaders, children }: Props) => {
  const { headers, setHeaders } = useAppContext();

  useEffect(() => {
    if (initHeaders.length) {
      setHeaders(initHeaders);
    }
  }, [initHeaders]);

  const router = useRouter();

  const isEco = ![APP_ROUTE.HOME, APP_ROUTE.DEMONSTRATION].includes(router.pathname);

  return (
    <CartContextProvider>
      <Header headers={isEco ? headers : []} />

      {isEco && <Breadcrumb />}

      <main
        className={clsx(styles.layout, {
          [styles.noMargin]: isEco,
        })}
      >
        {children}
      </main>
      <Footer />
    </CartContextProvider>
  );
};

export default Layout;
