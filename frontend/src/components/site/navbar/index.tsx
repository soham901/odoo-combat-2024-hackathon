import { publicRoutes } from "@/config/navbar";

import Link from "next/link";
import { Package2 } from "lucide-react";

import ActiveLink from "./active-link";
import UserBtn from "./user-btn";
import SearchBar from "./search-bar";
import { title } from "@/config/site";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">{title}</span>
        </Link>
        {publicRoutes.map((link) => (
          <ActiveLink key={link.href} href={link.href}>
            {link.name}
          </ActiveLink>
        ))}
      </nav>
      <MobileNav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchBar />
        <UserBtn />
      </div>
    </header>
  );
}
