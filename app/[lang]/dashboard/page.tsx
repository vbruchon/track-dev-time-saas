import { Hello } from "@/components/features/dashboard/home/hello";
import { ProductivityOverview } from "@/components/features/dashboard/home/productivity-overview";
import { ProjectOverview } from "@/components/features/dashboard/home/project-overview";
import { SessionsOverview } from "@/components/features/dashboard/home/sessions-overview";
import { getRequiredUser } from "@/lib/auth-session";
import { getUserSubscription } from "@/lib/queries/dashboard/subscription/get-user-subscription";
import { getDictionary } from "@/locales/dictionaries";
import { differenceInDays } from "date-fns";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const user = await getRequiredUser();
  const userSubscribtion = await getUserSubscription(user.id);

  const { lang } = await params;
  const dict = await getDictionary(lang, "dashboard/home");

  const trialDaysTotal = 7;
  const daysSinceCreation = differenceInDays(new Date(), user.createdAt);
  const trialActive = !userSubscribtion && daysSinceCreation < trialDaysTotal;
  const trialDaysLeft = trialActive ? trialDaysTotal - daysSinceCreation : 0;

  return (
    <>
      <Hello
        name={user.name ?? user.email}
        subscriptionPlan={userSubscribtion?.plan}
        trialActive={trialActive}
        trialDaysLeft={trialDaysLeft}
        dict={dict.helloSection}
      />
      <ProductivityOverview dict={dict.productivity} />

      <SessionsOverview dict={dict.sessions} />

      <ProjectOverview dict={dict.projects} />
    </>
  );
}
