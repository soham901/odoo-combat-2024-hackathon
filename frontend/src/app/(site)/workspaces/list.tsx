"use client";

import { WorkSpace } from "@/types/workspace";
import Card from "./card";
import { useQuery } from "@tanstack/react-query";
import { getListAPI } from "@/apis/workspaces/list";

export default function List() {
  // const data: WorkSpace[] = [
  //   {
  //     id: "1",
  //     name: "WorkSpace 1",
  //     slug: "workspace-1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit est, sunt voluptates aliquam ex molestias adipisci sapiente, illum quae impedit, autem ullam! Dignissimos, necessitatibus soluta deleniti sit eveniet et in nemo dolorem!",
  //     image: "/space.png",
  //     city: "Rajkot",
  //   },
  // ];

  const { data, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await getListAPI();
      return res.results as WorkSpace[];
    },
  });

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {data?.map((item, index) => (
        <Card
          city={item.city}
          id={item.id}
          image={"http://127.0.0.1:8000/" + item.image}
          slug={item.slug}
          name={item.name}
          state={item.state}
          tagline={item.tagline}
          key={index}
        />
      ))}
      {/* {data?.map((item, index) => (
        <Card key={index} {...item} />
      ))} */}
    </div>
  );
}
