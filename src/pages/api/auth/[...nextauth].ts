import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // async jwt({ token, account, profile }) {
    //   console.log(token);
    // },
    // async session(session: any, token, user) {
    //   console.log(session);
    //   return session;
    // },
    // async signIn(user: any, account: any, profile: any) {
    //   console.log(user);
    //   return user;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
