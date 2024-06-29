"use client";

import MobileNav from "@/components/site/navbar/mobile-nav";
import UserButton from "@/components/site/navbar/user-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { title } from "@/configs/site";
import { cn } from "@/lib/utils";
// import { Breadcrumb } from "@/components/ui/breadcrumb";
// import ToggleTheme from "@/components/ui/toggle-theme";
import { useUserStore } from "@/stores/useUser";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import ActiveLink from "@/components/site/common/active-link";

export default function Navbar() {
  const { user } = useUserStore();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <Package2 className="h-6 w-6" /> */}
            <span className="">{title}</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <ActiveLink href="/dashboard">
              <Home className="h-4 w-4" />
              Dashboard
            </ActiveLink>
            <ActiveLink href="/dashboard/bookings">
              <ShoppingCart className="h-4 w-4" />
              Bookings
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </ActiveLink>
            <ActiveLink href="/dashboard/workspaces">
              <Package className="h-4 w-4" />
              Workspaces{" "}
            </ActiveLink>
            <ActiveLink href="/dashboard/customers">
              <Users className="h-4 w-4" />
              Customers
            </ActiveLink>
            <ActiveLink href="/dashboard/analytics">
              <LineChart className="h-4 w-4" />
              Analytics
            </ActiveLink>
          </nav>
        </div>
        {/* <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
