import React, { memo, useEffect, useState } from 'react';
import Container from '~/components/container';
import Head from 'next/head';
import { AuthContextProvider } from '~/contexts/AuthContext';
import SSOComponent from '~/components/demonstration/sso';
import { SessionProvider } from 'next-auth/react';
import request from '~/helpers/axios';
import Cookies from 'next-cookies';

const SSO = ({ session }) => {
  return (
    <SessionProvider session={session}>
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

export async function getServerSideProps(context) {
  const { req, res } = context;

  const deviceId = parseUserAgent(req.headers['user-agent']).client?.name;

  const { user } = await request.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/session`, {
    headers: {
      deviceId,
    },
  });

  console.log('user server', user);

  let session = null;
  if (user?.accessToken) {
    session = {
      user,
      expires: user.expired,
    };

    res.setHeader('Set-Cookie', [`accessToken=${user.accessToken}`]);
  }

  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}

export default SSO;
