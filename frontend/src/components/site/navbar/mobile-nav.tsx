"use client";

import { publicRoutes } from "@/config/navbar";

import Link from "next/link";
import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ActiveLink from "./active-link";
import { title } from "@/config/site";
import { useState } from "react";

export default function MobileNav() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Sheet onOpenChange={setIsOpened} open={isOpened}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">{title}</span>
          </Link>
          {publicRoutes.map((link) => (
            <ActiveLink
              key={link.href}
              href={link.href}
              onClick={() => setIsOpened(false)}
            >
              {link.name}
            </ActiveLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
