import React, { memo, useState } from 'react';
import Container from '~/components/container';
import Head from 'next/head';
import { AuthContextProvider } from '~/contexts/AuthContext';
import SSOComponent from '~/components/demonstration/sso';
import { SessionProvider } from 'next-auth/react';

const Demonstration = () => {
  return (
    <SessionProvider>
      {/* <AuthContextProvider> */}
      <Head>
        <title>SSO</title>
      </Head>
      <Container>
        <SSOComponent />
      </Container>
      {/* </AuthContextProvider> */}
    </SessionProvider>
  );
};

export default Demonstration;
