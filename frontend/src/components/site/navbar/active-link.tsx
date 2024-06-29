"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isActive = href == "/" ? pathname === href : pathname?.startsWith(href);

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        `transition-colors hover:text-primary uppercase text-nowrap ${
          isActive ? "text-primary font-medium" : "text-foreground"
        }`,
        className
      )}
    >
      {children}
    </Link>
  );
}
