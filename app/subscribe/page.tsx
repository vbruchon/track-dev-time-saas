import Link from "next/link";
import { getRequiredUser } from "@/lib/auth-session";
import { differenceInDays } from "date-fns";
import { PricingSection } from "@/components/features/dashboard/subscribe/pricing-section";
import { prisma } from "@/lib/prisma";

export default async function SubscribePage() {
  const user = await getRequiredUser({ redirectToSubscribe: false });
  const userSubscribe = await prisma.subscription.findFirst({
    where: { referenceId: user.id },
  });

  const trialDaysTotal = 7;
  const daysSinceCreation = differenceInDays(new Date(), user.createdAt);
  const endTrial = !userSubscribe && daysSinceCreation > trialDaysTotal;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">🚀 Upgrade to Pro</h1>
        {endTrial && (
          <p className="text-muted-foreground">
            Your 7-day trial has ended. Choose a plan to continue using Track
            Dev Time.
          </p>
        )}
      </div>
      <PricingSection />

      <div className="text-center text-sm ">
        Need help?{" "}
        <Link
          href="/dashboard/support"
          className="hover:underline underline-offset-2"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
