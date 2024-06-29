"use client";

import { WorkSpace } from "@/types/workspace";
import { useQuery } from "@tanstack/react-query";
import { getDetailsAPI } from "@/apis/workspaces/list";

import Title from "@/components/site/common/title";
import { useEffect, useState } from "react";

export default function Details({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<WorkSpace | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params?.slug &&
      getDetailsAPI(params.slug).then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [params]);

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="">
      <Title className="text-foreground/80 font-bold text-center">
        Workspace Details
      </Title>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
