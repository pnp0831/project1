import '~/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '~/components/layout';
import App, { AppContext, NextWebVitalsMetric } from 'next/app';
import request from '~/helpers/axios';
import { AppContextProvider } from '~/contexts/AppContext';
import { API_GET_CATEGORY } from '~/apis';
import { CATEGORIES } from '~/constants';
import { AuthContextProvider } from '~/contexts/AuthContext';
import { SnackbarContextProvider } from '~/contexts/SnackbarContext';
import SnackbarContainer from '~/components/ecommerce/snackbar';

export default function MyApp({ Component, pageProps, headers = CATEGORIES, ...rest }: AppProps) {
  return (
    <AppContextProvider>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <Layout headers={headers}>
            <>
              <Component {...pageProps} headers={headers} />
              <SnackbarContainer />
            </>
          </Layout>
        </SnackbarContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);

//   let headers = [];

//   if (!!appContext.ctx.req) {
//     // headers = await request.get(API_GET_CATEGORY);
//     headers = CATEGORIES;
//   }

//   return {
//     ...appProps,
//     headers,
//   };
// };
