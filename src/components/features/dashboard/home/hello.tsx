import { MotivationMessage } from "./motivation-message";
import { WeeklyGoal } from "./weekly-goal";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { SubscriptionPlan } from "@/generated";
import { SubscriptionStatus } from "./subscribtion-status";

export type HelloSectionDict = {
  hello: {
    greeting: string;
    howToStartTracking: string;
  };
  subscriptionStatus: {
    trial: string;
    daysLeft: string;
    upgradeNow: string;
    inPlan: string;
  };
  motivationMessage: {
    noCoding: string;
    shortSession1: string;
    shortSession2: string;
    productiveSession1: string;
    productiveSession2: string;
    longSession1: string;
    longSession2: string;
  };
  weeklyGoal: {
    label: string;
  };
};

export type HelloProps = {
  name: string;
  subscriptionPlan: SubscriptionPlan | undefined;
  trialActive: boolean;
  trialDaysLeft: number;
  dict: HelloSectionDict;
};

export const Hello = ({
  name,
  subscriptionPlan,
  trialActive,
  trialDaysLeft,
  dict,
}: HelloProps) => {
  let subscriptionText = "";

  if (trialActive) {
    subscriptionText = `Trial - ${trialDaysLeft} day${trialDaysLeft > 1 ? "s" : ""} left`;
  } else if (subscriptionPlan) {
    subscriptionText = subscriptionPlan.toLowerCase().replace(/_/g, " ");
  }

  return (
    <div className="p-5 space-y-4 relative">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {dict.hello.greeting} {name}
        </h1>
        <SubscriptionStatus
          trialActive={trialActive}
          isSubscribed={Boolean(subscriptionPlan)}
          subscriptionText={subscriptionText}
          dict={dict}
        />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <MotivationMessage dict={dict.motivationMessage} />
        <WeeklyGoal dict={dict.weeklyGoal} />
        <div className="flex gap-2">
          <Link
            href="/dashboard/docs"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            {dict.hello.howToStartTracking}
            <BookOpenText className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
