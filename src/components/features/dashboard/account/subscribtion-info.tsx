import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Subscription } from "@/generated";

type SubscriptionInfoDict = {
  freeTrial: string;
  upgradeButton: string;
  plans: {
    pro_monthly: string;
    pro_yearly: string;
  };
  status: {
    active: string;
    inactive: string;
  };
  nextRenewal: string;
  manageButton: string;
};

export const SubscriptionInfo = ({
  subscription,
  dict,
  lang,
}: {
  subscription: Subscription | null;
  dict: SubscriptionInfoDict;
  lang: string;
}) => {
  const plan =
    subscription?.plan === "pro_monthly"
      ? dict.plans.pro_monthly
      : dict.plans.pro_yearly;

  const locale = lang === "fr" ? "fr-FR" : "en-US";

  if (!subscription) {
    return (
      <div className="flex items-center space-x-4">
        <p
          className="text-foreground"
          dangerouslySetInnerHTML={{ __html: dict.freeTrial }}
        />
        <Link
          href="/subscribe"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {dict.upgradeButton}
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
            <Badge>{dict.status.active}</Badge>
          ) : (
            <Badge variant="destructive">{dict.status.inactive}</Badge>
          )}
        </div>

        {subscription.periodEnd && (
          <p
            className="text-sm text-foreground"
            dangerouslySetInnerHTML={{
              __html: dict.nextRenewal.replace(
                "{{date}}",
                new Date(subscription.periodEnd).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              ),
            }}
          />
        )}

        <Link href="/dashboard/account/billing">
          <Button variant="outline">{dict.manageButton}</Button>
        </Link>
      </div>
    </div>
  );
};
