"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type IconTooltipButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  disabled?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Button>, "onClick" | "children">;

export const IconTooltipButton = ({
  icon,
  onClick,
  tooltip,
  disabled = false,
  className,
  ...props
}: IconTooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={onClick}
            disabled={disabled}
            className={cn("shrink-0", className)}
            {...props}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
