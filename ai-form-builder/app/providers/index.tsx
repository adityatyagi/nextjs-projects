// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?source=post_page-----26b9492c227--------------------------------

"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
