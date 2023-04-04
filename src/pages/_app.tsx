import '~/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '~/components/layout';
import App, { AppContext, NextWebVitalsMetric } from 'next/app';
import request from '~/helpers/axios';
import { AppContextProvider } from '~/contexts/app-context';
import { API_GET_CATEGORY } from '~/apis';
import { CATEGORIES } from '~/constants';
import { SnackbarContextProvider } from '~/contexts/snackbar-context';
import SnackbarContainer from '~/components/ecommerce/snackbar';
import Head from 'next/head';
import { Roboto } from 'next/font/google';

const RobotoFont = Roboto({ subsets: ['latin'], weight: ['100', '400', '900'] });

export default function MyApp({ Component, pageProps, headers = CATEGORIES, ...rest }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${RobotoFont.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <AppContextProvider>
        <SnackbarContextProvider>
          <Layout headers={headers}>
            <>
              <Component {...pageProps} headers={headers} />
              <SnackbarContainer />
            </>
          </Layout>
        </SnackbarContextProvider>
      </AppContextProvider>
    </>
  );
}
