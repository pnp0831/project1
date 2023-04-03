import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Button from '../button';
import { signIn, signOut, useSession } from 'next-auth/react';

// const SSOComponent = memo((props) => {
//   const router = useRouter();
//   const { user, error, isLoading } = useUser();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;
//   if (user)
//     return (
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           padding: '50px',
//         }}
//       >
//         <img style={{ marginBottom: '10px' }} src={user.picture} alt={user.name} />
//         <h2 style={{ marginBottom: '10px' }}>{user.name}</h2>
//         <p style={{ marginBottom: '10px' }}>{user.email}</p>
//         <Button onClick={() => router.push('/api/auth/logout')}>Logout</Button>
//       </div>
//     );

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         padding: '50px',
//       }}
//     >
//       <h1 style={{ marginBottom: '50px' }}>Sign In</h1>

//       <Button onClick={() => router.push('/api/auth/login')}>Login</Button>
//     </div>
//   );
// });

const SSOComponent = ({ session }) => {
  const router = useRouter();

  console.log('session', session, status);

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
        <Button onClick={() => signOut()}>Logout</Button>
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
