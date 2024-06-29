import { cn } from "@/lib/utils";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

export default function Title(props: Props) {
  return (
    <div
      className={cn(
        "sm:text-4xl text-2xl font-semibold text-primary",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
