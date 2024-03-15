import NextAuth from "next-auth";

import { authConfigNextAuth } from "@/app/auth";

const handler = NextAuth(authConfigNextAuth);

export { handler as GET, handler as POST };
