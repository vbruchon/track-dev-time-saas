import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Subscription } from "@/generated";

export const SubscriptionInfo = ({
  subscription,
}: {
  subscription: Subscription | null;
}) => {
  const plan =
    subscription?.plan === "pro_monthly" ? "PRO (monthly)" : "PRO (yearly)";

  if (!subscription) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-foreground">
          You are currently on the <strong>free trial</strong>.
        </p>
        <Link
          href="/subscribe"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{plan}</Badge>
          {subscription.status === "active" ? (
            <Badge>Active</Badge>
          ) : (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>

        {subscription.periodEnd && (
          <p className="text-sm text-foreground">
            Next renewal:{" "}
            <strong>
              {new Date(subscription.periodEnd).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>
        )}

        <Link href="/dashboard/account/billing">
          <Button variant="outline">Manage subscription</Button>
        </Link>
      </div>
    </div>
  );
};
