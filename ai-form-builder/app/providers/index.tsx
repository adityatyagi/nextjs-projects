// TODO:
// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?source=post_page-----26b9492c227--------------------------------
// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
// https://reacthustle.com/blog/extend-user-session-nextauth-typescript
"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
