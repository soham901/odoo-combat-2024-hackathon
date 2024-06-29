import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ButtonProps } from "@/components/ui/button";

export default function SubmitButton({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & {
  isLoading?: boolean;
}) {
  return (
    <Button disabled={isLoading} type="submit" className={className} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
