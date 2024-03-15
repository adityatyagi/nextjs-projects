import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
let handler;
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: process.env.AUTH_SECRET,
  });
} else {
  console.error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are absent");
}

export { handler as GET, handler as POST };
