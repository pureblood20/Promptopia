import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
// });

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // async session({ session }) {},
  // async signin({ profile }) {},
});

export { handler as GET, handler as POST };
