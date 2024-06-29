"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatINR from "@/utils/inr-formatter";

import { useUserStore } from "@/stores/useUser";

export default function Page() {
  const { roleData } = useUserStore();

  const analytics = [
    {
      title: "Total Allocated",
      description: (
        <div className="">
          <div className="text-2xl font-semibold">{formatINR(120000)}</div>
          <div className="text-sm text-muted-foreground">
            Lifetime donations
          </div>
        </div>
      ),
    },
    {
      title: "Donation Asks",
      description: (
        <div className="">
          <div className="text-2xl space-x-1">
            <span className="font-semibold">4</span>
            <span>/</span>
            <span className="font-semibold">10</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Overview of all asks
          </div>
        </div>
      ),
    },
    {
      title: "Average Donation",
      description: (
        <div className="">
          <div className="text-2xl font-semibold">{formatINR(1250)}</div>
          <div className="text-sm text-muted-foreground">Average donation</div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-2">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">
          Balance:{" "}
          <span className="font-semibold">
            {formatINR(roleData?.balance || 0)}
          </span>
        </h1>
        <div className="flex gap-2">
          <Link href="/dashboard/donations">
            <Button variant={"secondary"}>View Donations</Button>
          </Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
        {analytics.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>{item.description}</CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />
    </div>
  );
}
