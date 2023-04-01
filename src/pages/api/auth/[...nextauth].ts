import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import request, { setToken, defaultHeaders } from '~/helpers/axios';
import { serialize, parse } from 'cookie';
import config from '~/constants/config';
import cookies from 'next-cookies';
import { NextApiRequest, NextApiResponse } from 'next';

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      CredentialsProvider({
        id: process.env.NEXTAUTH_SECRET,
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          const { user, accessToken } = await request.post(
            `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/signin`,
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          const serializedCookie = serialize('accessToken', accessToken, config.cookieConfig);
          res.setHeader('Set-Cookie', serializedCookie);

          try {
            setToken(accessToken);
          } catch (e) {
            console.log('e', e);
          }

          return user;
        },
      }),
    ],
    events: {
      async signOut({ session, token }) {
        await request.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/signout`,
          {},
          {
            headers: defaultHeaders,
          }
        );
        setToken();
        const serializedCookie = serialize('accessToken', null, {
          ...config.cookieConfig,
          maxAge: 0,
        });

        res.setHeader('Set-Cookie', serializedCookie);
      },
    },
    callbacks: {
      async signIn({ user, account, profile }) {
        return true;
      },
      async session({ session, token }) {
        const cookieHeader = req.headers.cookie;

        // Parse the cookie header into an object
        const cookies = cookieHeader ? parse(cookieHeader) : {};

        const { user } = await request.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/session`, {
          headers: {
            accessToken: cookies.accessToken,
          },
        });

        if (user?.id) {
          return { user };
        }

        return null;
      },
      async redirect({ url, baseUrl }) {
        return url;
      },
    },
  };
};

export default (req, res) => {
  // const cookieHeader = req.headers.cookie;

  // // Parse the cookie header into an object
  // const cookies = cookieHeader ? parse(cookieHeader) : {};

  // setToken(cookies.accessToken || cookies.accesstoken);

  // console.log('cookie', cookies.accessToken || cookies.accesstoken);

  return NextAuth(req, res, nextAuthOptions(req, res));
};
