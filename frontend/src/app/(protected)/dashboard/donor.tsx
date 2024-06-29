"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import formatINR from "@/utils/inr-formatter";

import { useUserStore } from "@/stores/useUser";
// import AddBalanceButton from "@/components/site/add-balance-button";

export default function Page() {
  const { roleData } = useUserStore();

  const analytics = [
    {
      title: "Total Donated",
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
      title: "Donations Made",
      description: (
        <div className="">
          <div className="text-2xl font-semibold">124</div>
          <div className="text-sm text-muted-foreground">Total donations</div>
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
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">
          Balance:{" "}
          <span className="font-semibold">
            {formatINR(roleData?.balance || 0)}
          </span>
        </h1>
        <div className="flex gap-2">
          {/* <AddBalanceButton /> */}
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

      <Separator className="my-12" />

      <Card>
        <CardHeader>
          <CardTitle>Non Profits</CardTitle>
          <CardDescription>
            Non profits that you have contributed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid">
            <div className="">
              <h3 className="text-xl font-semibold">Bolbala Trust</h3>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Shakti Trust</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      {/* github chart of contributions */}
      <Image
        src="/contributions.png"
        alt="Contributions"
        width={800}
        height={400}
        className="w-full"
      />
    </div>
  );
}
