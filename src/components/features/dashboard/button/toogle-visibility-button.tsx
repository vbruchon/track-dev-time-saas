"use client";

import { Eye, EyeOff } from "lucide-react";
import { IconTooltipButton } from "./icon-tooltip-button";

type ToggleVisibilityButtonProps = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export const ToggleVisibilityButton = ({
  value,
  onToggle,
}: ToggleVisibilityButtonProps) => {
  return (
    <IconTooltipButton
      icon={value ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      onClick={() => onToggle(!value)}
      tooltip={value ? "Hide" : "Show"}
    />
  );
};
