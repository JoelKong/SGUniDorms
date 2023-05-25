import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../../utils/firebaseInit";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
    async jwt({ token }: any) {
      try {
        const user = doc(db, "users", token.sub);
        const checkUserExists = await getDoc(user);
        if (checkUserExists.exists()) {
          token.user = checkUserExists.data();
          return token;
        } else {
          await setDoc(user, {
            id: token.sub,
            name: token.name,
            email: token.email,
            profilepicture: token.picture,
          });
          token.user = checkUserExists.data();
          return token;
        }
      } catch (error) {
        return token;
      }
    },
    async session(session: any) {
      return session.token.user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
