import { WorkSpace } from "@/types/workspace";
import Card from "./card";

export default function List() {
  const data: WorkSpace[] = [
    {
      id: "1",
      name: "WorkSpace 1",
      slug: "workspace-1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit est, sunt voluptates aliquam ex molestias adipisci sapiente, illum quae impedit, autem ullam! Dignissimos, necessitatibus soluta deleniti sit eveniet et in nemo dolorem!",
      image: "/space.png",
      city: "Rajkot",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}
