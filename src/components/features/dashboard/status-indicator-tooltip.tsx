"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeCheck, BadgeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isValid: boolean;
  labelIfValid: string;
  labelIfInvalid: string;
  iconIfValid?: React.ReactNode;
  iconIfInvalid?: React.ReactNode;
  className?: string;
};

export const StatusIndicatorTooltip = ({
  isValid,
  labelIfValid,
  labelIfInvalid,
  className,
  iconIfValid,
  iconIfInvalid,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {isValid
          ? (iconIfValid ?? <BadgeCheck className="size-4 text-success" />)
          : (iconIfInvalid ?? <BadgeX className="size-4 text-destructive" />)}
      </TooltipTrigger>

      <TooltipContent
        className={cn(
          "text-sm",
          { "bg-destructive text-white": !isValid },
          className
        )}
      >
        <p>{isValid ? labelIfValid : labelIfInvalid}</p>
      </TooltipContent>
    </Tooltip>
  );
};
