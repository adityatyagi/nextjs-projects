import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./button";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  return (
    <header className="container">
      <nav className="flex justify-between p-6 items-center">
        {/* left */}
        <div>
          <h3>AI Form Builder</h3>
        </div>
        {/* right */}

        <div>
          {session?.user ? (
            <div className="flex gap-6 items-center">
              <p>{session.user.name}</p>
              <Link href="/api/auth/signout">
                <Button>Sign Out</Button>
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
