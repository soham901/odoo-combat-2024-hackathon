"use client";

import LoadingScreen from "@/components/site/common/loading-screen";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUser";
import Link from "next/link";

export default function Page() {
  const { user, loading } = useUserStore();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="">
      <div className="">Hello {user?.display_name}</div>
      <div className="">Welcome to the DonateX platform.</div>
      <div className="flex gap-4 mt-2">
        <Link href={"/dashboard/register?as=donor"}>
          <Button>Become a donor</Button>
        </Link>
        <Link href={"/dashboard/register?as=nonprofit"}>
          <Button variant={"secondary"}>Register your nonprofit</Button>
        </Link>
      </div>
    </div>
  );
}
