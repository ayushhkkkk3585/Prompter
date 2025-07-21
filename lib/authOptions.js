// /lib/authOptions.js
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.email.split("@")[0].toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
};
