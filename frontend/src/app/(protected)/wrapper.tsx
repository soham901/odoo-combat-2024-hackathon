"use client";

import LoadingScreen from "@/components/site/common/loading-screen";
import { useUserStore } from "@/stores/useUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useUserStore();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
}
