"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, badgeVariants, BadgeProps } from "@/components/ui/badge";
import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Donation = {
  id: number;
  status: "pending" | "processing" | "success" | "failed";
  total_amount: number;
  allocated_amount: number;
  created_at: string;
  donor: number;
};

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("total_amount")}</div>,
  },
  {
    accessorKey: "allocated_amount",
    header: "Allocated",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let variant = "default";
      let className = "";

      switch (row.getValue("status")) {
        case "pending":
          variant = "default";
          break;
        case "processing":
          variant = "outline";
          className = "bg-cyan-500";
          break;
        case "success":
          variant = "outline";
          className = "bg-green-500";
          break;
        case "failed":
          className = "bg-red-400";
          variant = "secondary";
          break;
      }

      return (
        <Badge className={"capitalize font-medium " + className}>
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Donated",
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">
                {new Date(row.getValue("created_at")).toLocaleDateString(
                  "en-IN"
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {new Date(row.getValue("created_at")).toLocaleString("en-IN")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(record.id.toString())
              }
            >
              Copy Donation ID
            </DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
