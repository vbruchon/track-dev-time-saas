import Link from "next/link";
import { getRequiredUser } from "@/lib/auth-session";
import { differenceInDays } from "date-fns";
import { PricingSection } from "@/components/features/dashboard/subscribe/pricing-section";
import { prisma } from "@/lib/prisma";
import { getDictionary } from "@/locales/dictionaries";

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const user = await getRequiredUser({ redirectToSubscribe: false });
  const userSubscribe = await prisma.subscription.findFirst({
    where: { referenceId: user.id },
  });

  const { lang } = await params;
  const dict = await getDictionary(lang, "subscribe");

  const trialDaysTotal = 7;
  const daysSinceCreation = differenceInDays(new Date(), user.createdAt);
  const endTrial = !userSubscribe && daysSinceCreation > trialDaysTotal;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{dict.title}</h1>
        {endTrial && <p className="text-muted-foreground">{dict.trialEnded}</p>}
      </div>
      <PricingSection
        monthlyLabel={dict.pricingSection.monthlyLabel}
        yearlyLabel={dict.pricingSection.yearlyLabel}
        features={dict.pricingSection.features}
      />

      <div className="text-center text-sm ">
        {dict.helpText}{" "}
        <Link
          href="/dashboard/support"
          className="hover:underline underline-offset-2"
        >
          {dict.contactSupport}
        </Link>
      </div>
    </div>
  );
}
