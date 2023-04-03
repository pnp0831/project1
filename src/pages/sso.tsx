import React, { memo, useEffect, useState } from 'react';
import Container from '~/components/container';
import Head from 'next/head';
import { AuthContextProvider } from '~/contexts/AuthContext';
import SSOComponent from '~/components/demonstration/sso';
import { SessionProvider } from 'next-auth/react';
import request from '~/helpers/axios';
import Cookies from 'next-cookies';
import DeviceDetector from 'device-detector-js';

const parseUserAgent = (userAgent) => {
  const deviceDetector = new DeviceDetector();

  const device = deviceDetector.parse(userAgent);

  return device;
};

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
