import NextAuth from "next-auth";

import { authConfigNextAuth } from "@/auth";

const handler = NextAuth(authConfigNextAuth);

export { handler as GET, handler as POST };
