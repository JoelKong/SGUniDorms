import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session(session: any) {
      // const client = await MongoClient.connect(process.env.MONGODB_URI);
      // const db = client.db();
      // const collection = db.collection("users");
      // const userData = await collection.findOne({ id: session.token.sub });
      // if (userData) {
      //   session.session.user.currentBalance = userData.currentBalance;
      //   session.session.user.id = userData.id;
      // }
      // client.close();
      return session;
    },
    async signIn(user: any, account: any, profile: any) {
      console.log(user);
      return true;
      // const client = await MongoClient.connect(process.env.MONGODB_URI);
      // const db = client.db();
      // const collection = db.collection("users");
      // if (await collection.findOne({ id: user.user.id })) {
      //   client.close();
      //   return true;
      // } else {
      //   await collection.updateOne(
      //     { id: user.user.id },
      //     {
      //       $set: {
      //         id: user.user.id,
      //         email: user.user.email,
      //         name: user.user.name,
      //         image: user.user.image,
      //         currentBalance: 10,
      //       },
      //     },
      //     { upsert: true }
      //   );
      //   client.close();
      //   return true;
      // }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
