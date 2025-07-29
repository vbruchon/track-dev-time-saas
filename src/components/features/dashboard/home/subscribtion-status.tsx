import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type SubscriptionStatusProps = {
  trialActive: boolean;
  isSubscribed: boolean;
  subscriptionText: string;
};

export function SubscriptionStatus({
  trialActive,
  isSubscribed,
  subscriptionText,
}: SubscriptionStatusProps) {
  return (
    <>
      {trialActive && (
        <div className="mt-2 flex items-center gap-4">
          <Badge variant="outline">{subscriptionText}</Badge>
          <Link
            href="/dashboard/subscribe"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            Upgrade now
          </Link>
        </div>
      )}

      {isSubscribed && (
        <Tooltip>
          <TooltipTrigger>
            <span className="text-4xl">🚀</span>
          </TooltipTrigger>
          <TooltipContent>You&apos;re in {subscriptionText}</TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
