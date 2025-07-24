"use client";

import { Sparkles } from "lucide-react";
import { IconTooltipButton } from "./icon-tooltip-button";

export const GenerateButton = ({
  onGenerate,
}: {
  onGenerate: () => void | Promise<void>;
}) => {
  return (
    <IconTooltipButton
      icon={<Sparkles className="size-4" />}
      onClick={onGenerate}
      tooltip="Générer"
    />
  );
};
