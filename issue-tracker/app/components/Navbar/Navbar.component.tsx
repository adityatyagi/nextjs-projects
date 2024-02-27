"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { NavItem } from "./Navbar.types";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Navbar = () => {
  // to get the active navbar item
  const currentPath = usePathname();

  const links: NavItem[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center px-3">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((navItem, index) => {
          return (
            <li key={index}>
              <Link
                href={navItem.href}
                className={classNames({
                  "text-zinc-900": navItem.href === currentPath,
                  "text-zinc-500": navItem.href !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {navItem.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
