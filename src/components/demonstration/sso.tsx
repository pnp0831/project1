import React, { memo } from 'react';
import { useRouter } from 'next/router';
import Button from '../button';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';

const SSOComponent = ({ session }) => {
  const router = useRouter();
  const nextAuthSession = useSession();
  console.log('nextAuthSession', nextAuthSession);
  console.log('session', session);

  const logout = async () => {
    const csrtToken = await getCsrfToken();

    deleteCookie('accessToken');

    console.log('logout', nextAuthSession);

    if (nextAuthSession?.status === 'unauthenticated') {
      await request.post('/api/auth/logout', {
        csrtToken,
        userId: session?.user?.userId,
      });
    }

    signOut({ redirect: false });
  };

  if (session?.user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px',
        }}
      >
        <img
          style={{ marginBottom: '10px' }}
          src={session?.user?.image}
          alt={session?.user?.name}
        />
        <h2 style={{ marginBottom: '10px' }}>{session?.user?.name}</h2>
        <p style={{ marginBottom: '10px' }}>{session?.user?.email}</p>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '50px',
      }}
    >
      <h1 style={{ marginBottom: '50px' }}>Sign In</h1>

      <Button onClick={() => signIn()}>Login</Button>
    </div>
  );
};

export default SSOComponent;
