import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization:'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
  ],
  secret: "secret token",
});