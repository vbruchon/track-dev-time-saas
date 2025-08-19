import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStripePortalUrl } from "@/lib/actions/get-stripe-portal";
import { getRequiredUser } from "@/lib/auth-session";
import { getUserSubscription } from "@/lib/queries/dashboard/subscription/get-user-subscription";
import Link from "next/link";

export default async function BillingPage() {
  const user = await getRequiredUser();
  const subscription = await getUserSubscription(user.id);

  if (!subscription) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">
          You are currently on a <strong>free trial</strong>.
        </p>
        <Button asChild>
          <Link href="/subscribe">Upgrade Now</Link>
        </Button>
      </div>
    );
  }

  const portalUrl = await getStripePortalUrl();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Billing</h1>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge>{subscription.plan}</Badge>
          {subscription.status === "active" && <Badge>Active</Badge>}
          {subscription.status !== "active" && (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>

        {subscription.periodEnd && (
          <p className="text-sm text-muted-foreground">
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

        <form>
          <button formAction={() => portalUrl} type="submit">
            Manage subscription
          </button>
        </form>
      </div>
    </div>
  );
}
