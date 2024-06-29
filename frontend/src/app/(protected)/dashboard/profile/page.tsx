"use client";

import { useUserStore } from "@/stores/useUser";

export default function Profile() {
  const { user } = useUserStore();

  return (
    <div className="">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
