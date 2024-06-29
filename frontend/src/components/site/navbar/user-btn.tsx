"use client";

import { meAPI } from "@/apis/user/me";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { CircleUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/useUser";
import api from "@/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import { IUser } from "@/types/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/configs/api";

export default function UserButton() {
  const { loading, isAuthenticated, user, setUser, logout } = useUserStore();
  const router = useRouter();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: meAPI,
    enabled: !loading && isAuthenticated && !user,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div className="">
      {loading || isLoading ? (
        <Skeleton className="size-10 rounded-full" />
      ) : isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={ROUTES.dashboard}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"#"}>Notifications</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"#"}>Edit Profile</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <Button
              variant={"destructive"}
              size={"sm"}
              className="w-full"
              onClick={() => {
                api.get("/auth/logout/").then(() => {
                  logout();
                  router.push(ROUTES.home);
                });
              }}
            >
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { CircleUser } from "lucide-react";

// export default function UserBtn() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="secondary" size="icon" className="rounded-full">
//           <CircleUser className="h-5 w-5" />
//           <span className="sr-only">Toggle user menu</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Settings</DropdownMenuItem>
//         <DropdownMenuItem>Support</DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Logout</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
