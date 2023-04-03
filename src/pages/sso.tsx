import React, { memo, useState } from 'react';
import Container from '~/components/container';
import Head from 'next/head';
import { AuthContextProvider } from '~/contexts/AuthContext';
import SSOComponent from '~/components/demonstration/sso';

const Demonstration = () => {
  return (
    <AuthContextProvider>
      <Head>
        <title>SSO</title>
      </Head>
      <Container>
        <SSOComponent />
      </Container>
    </AuthContextProvider>
  );
};

export default Demonstration;
