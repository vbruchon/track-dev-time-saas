import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type PricingFeatureItemProps = {
  children: React.ReactNode;
  className?: string;
};

export const PricingFeatureItem = ({
  children,
  className,
}: PricingFeatureItemProps) => {
  return (
    <li
      className={cn("flex items-start gap-2 text-sm leading-snug", className)}
    >
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
      <span>{children}</span>
    </li>
  );
};
