import React, { memo, useEffect, useState } from 'react';
import Container from '~/components/container';
import Head from 'next/head';
import SSOComponent from '~/components/demonstration/sso';
import { SessionProvider } from 'next-auth/react';
import request from '~/helpers/axios';
import DeviceDetector from 'device-detector-js';
import { getCookie, deleteCookie } from 'cookies-next';
import { parse } from 'cookie';

const parseUserAgent = (userAgent) => {
  const deviceDetector = new DeviceDetector();

  const device = deviceDetector.parse(userAgent);

  return device;
};

const SSO = ({ session }) => {
  return (
    <SessionProvider>
      <Head>
        <title>SSO</title>
        <meta name="description" content="SSO" unique="true" />
      </Head>
      <Container>
        <SSOComponent session={session} />
      </Container>
    </SessionProvider>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;

  const cookies = parse(req.headers.cookie || '');

  const deviceId = parseUserAgent(req.headers['user-agent']).client?.name;

  const { user } = await request.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/session`, {
    headers: {
      deviceId,
      accessToken: cookies['accessToken'] || '',
    },
  });

  let session = null;

  const nextCookie =
    cookies['__Secure-next-auth.session-token'] || cookies['next-auth.session-token'];

  if (user?.accessToken) {
    session = {
      user,
      expires: user.expired,
    };

    res.setHeader('Set-Cookie', [`accessToken=${user.accessToken}`]);
  } else {
    if (!user?.accessToken) {
      res.setHeader('Set-Cookie', [`accessToken=; Max-Age=0`]);
    }
  }

  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}

export default SSO;
