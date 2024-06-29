import { Button } from "@/components/ui/button";
import * as SCard from "@/components/ui/card";
import { WorkSpace } from "@/types/workspace";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = WorkSpace;

export default function Card(props: Props) {
  return (
    <SCard.Card className="overflow-hidden">
      <SCard.CardHeader className="p-0">
        <Image
          src={props.image}
          alt={props.name}
          width={1600}
          height={900}
          className="w-full h-full aspect-video object-cover"
        />
        <SCard.CardTitle className="p-3 pb-0">{props.name}</SCard.CardTitle>
        <div className="p-3 overflow-hidden">
          <div className="line-clamp-4">{props.description}</div>
        </div>
      </SCard.CardHeader>
      <SCard.CardFooter className="flex gap-2 justify-between py-1 px-4 bg-muted">
        <Button asChild variant={"link"} className="w-fit pl-0">
          <Link
            href={`/workspaces/${props.slug}`}
            className="w-full h-full gap-2 flex items-center justify-center"
          >
            View Workspace
            <ChevronRight />
          </Link>
        </Button>
        <div className="text-muted-foreground text-sm">{props.city}</div>
      </SCard.CardFooter>
    </SCard.Card>
  );
}
