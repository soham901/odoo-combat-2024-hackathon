import { cn } from "@/lib/utils";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

export default function Wrapper({ children, ...props }: Props) {
  return (
    <main
      className={cn(
        "container mx-auto py-4 sm:py-6 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4",
        props.className
      )}
    >
      {children}
    </main>
  );
}
