"use client";

import { DataTable } from "./data-table";

import { Donation, columns } from "./columns";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import DonateButton from "@/components/site/donate-button";

import { getDonationsAPI } from "@/apis/donor/donate";
import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUser";

// async function getData(): Promise<Donation[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: 1,
//       total_amount: 2000,
//       allocated_amount: 0,
//       status: "pending",
//       created_at: new Date().toLocaleDateString("en-IN"),
//       user_id: 1,
//     },
//     {
//       id: 2,
//       total_amount: 6000,
//       allocated_amount: 650,
//       status: "processing",
//       created_at: new Date().toLocaleDateString("en-IN"),
//       user_id: 1,
//     },
//     {
//       id: 3,
//       total_amount: 2000,
//       allocated_amount: 520,
//       status: "processing",
//       created_at: new Date().toLocaleDateString("en-IN"),
//       user_id: 1,
//     },
//     {
//       id: 4,
//       total_amount: 2000,
//       allocated_amount: 520,
//       status: "processing",
//       created_at: new Date().toLocaleDateString("en-IN"),
//       user_id: 1,
//     },
//     {
//       id: 5,
//       total_amount: 2000,
//       allocated_amount: 520,
//       status: "failed",
//       created_at: new Date().toLocaleDateString("en-IN"),
//       user_id: 1,
//     },
//   ];
// }

export default function Component() {
  // const data = await getData();
  const { isAuthenticated, user } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: getDonationsAPI,
  });

  if (!isAuthenticated) return null;

  const fetchNextPage = async () => {};

  return (
    <div className="">
      <Card className="p-0">
        <div className="flex p-0 justify-between">
          <CardHeader className="p-4">
            <CardTitle>Donations</CardTitle>
            <CardDescription className="sm:block hidden">
              View and manage your donations.
            </CardDescription>
          </CardHeader>
          <DonateButton className="m-4" />
        </div>
        <CardContent className="p-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DataTable
              fetchNextPage={fetchNextPage}
              data={data.results as Donation[]}
              columns={columns}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
