"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { IconTooltipButton } from "../icon-tooltip-button";

export const CopyButton = ({ value }: { value: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <IconTooltipButton
      icon={
        isCopied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )
      }
      onClick={handleCopy}
      tooltip={isCopied ? "Copied to clipboard!" : "Copy to clipboard"}
    />
  );
};
