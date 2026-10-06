import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        return {
          id: "user1",
          email: "ramen@gmail.com",
          name: "Ramen",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Copy the user id into the token on sign-in
    jwt: ({ token, user }: any) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    // Copy it from the token into the session
    session: ({ session, token }: any) => {
      if (session?.user && token?.userId) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};