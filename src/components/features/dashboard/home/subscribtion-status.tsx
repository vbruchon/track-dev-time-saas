import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HelloProps } from "./hello";

type SubscriptionStatusProps = {
  trialActive: boolean;
  isSubscribed: boolean;
  subscriptionText: string;
  dict: HelloProps["dict"];
};

export function SubscriptionStatus({
  trialActive,
  isSubscribed,
  subscriptionText,
  dict,
}: SubscriptionStatusProps) {
  return (
    <>
      {trialActive && (
        <div className="mt-2 flex items-center gap-4">
          <Badge variant="outline">{subscriptionText}</Badge>
          <Link
            href="/subscribe"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            {dict.subscriptionStatus.upgradeNow}
          </Link>
        </div>
      )}

      {isSubscribed && (
        <Tooltip>
          <TooltipTrigger>
            <span className="text-4xl">🚀</span>
          </TooltipTrigger>
          <TooltipContent>
            {dict.subscriptionStatus.inPlan} {subscriptionText}
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
