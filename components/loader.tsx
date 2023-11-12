import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "w-5 h-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LoaderProps extends VariantProps<typeof loaderVariants> {}

export const Loader = ({ size }: LoaderProps) => {
  return <Loader2 className={cn(loaderVariants({ size }))} />;
};
