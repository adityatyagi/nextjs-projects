import React from "react";
import { auth } from "@/auth";
import Link from "next/link";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  return (
    <header className="container">
      <nav className="flex justify-between p-6">
        {/* left */}
        <div>
          <h3>AI Form Builder</h3>
        </div>
        {/* right */}

        <div>
          {session?.user ? (
            <div className="flex gap-6">
              <p>{session.user.name}</p>
              <Link href="/api/auth/signout">Sign Out</Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
