"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

type Props = {} & React.ComponentProps<typeof Link>;

export default function ActiveLink(props: Props) {
  const pathname = usePathname();
  const isActive =
    props.href == "/dashboard"
      ? pathname === props.href
      : pathname?.startsWith(props.href.toString());

  return (
    <Link
      {...props}
      href={props.href}
      className={cn(
        isActive
          ? `flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary`
          : `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`,
        props.className
      )}
    >
      {props.children}
    </Link>
  );
}
