import { Hello } from "@/components/features/dashboard/home/hello";
import { ProductivityOverview } from "@/components/features/dashboard/home/productivity-overview";
import { ProjectOverview } from "@/components/features/dashboard/home/project-overview";
import { SessionsOverview } from "@/components/features/dashboard/home/sessions-overview";
import { getRequiredUser } from "@/lib/auth-session";
import { getUserSubscription } from "@/lib/queries/dashboard/subscription/get-user-subscription";
import { differenceInDays } from "date-fns";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getRequiredUser();
  const userSubscribtion = await getUserSubscription(user.id);
  const trialDaysTotal = 7;
  const daysSinceCreation = differenceInDays(new Date(), user.createdAt);
  const trialActive = !userSubscribtion && daysSinceCreation < trialDaysTotal;
  const trialDaysLeft = trialActive ? trialDaysTotal - daysSinceCreation : 0;

  if (!trialActive && !userSubscribtion) {
    redirect("/subscribe");
  }

  return (
    <>
      <Hello
        name={user.name ?? user.email}
        subscriptionPlan={userSubscribtion?.plan}
        trialActive={trialActive}
        trialDaysLeft={trialDaysLeft}
      />
      <ProductivityOverview />
      <SessionsOverview />
      <ProjectOverview />
    </>
  );
}
