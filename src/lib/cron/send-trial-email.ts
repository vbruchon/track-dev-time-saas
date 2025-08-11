import { addDays, subDays } from "date-fns";
import { prisma } from "../prisma";
import { resend } from "../resend";
import TrialEndingSoon from "../../../emails/trial-ending-soon";
import TrialEnded from "../../../emails/trial-ended";
import { ReactElement } from "react";
import { User } from "@/generated";

async function getTrialUsersNotSubscribed(daysTrial = 7) {
  const trialStartDate = subDays(new Date(), daysTrial);

  const usersInTrial = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: trialStartDate,
      },
    },
  });

  const activeSubscriptions = await prisma.subscription.findMany({
    where: {
      status: "active",
    },
  });

  const subscribedUserIds = new Set(
    activeSubscriptions.map((sub) => sub.referenceId)
  );

  return usersInTrial.filter((user) => !subscribedUserIds.has(user.id));
}

type SendEmailProps = {
  user: User;
  type: "twoDaysLeft" | "trialEnded";
};

type EmailOptionsType = {
  from: string;
  to: string;
  react: ReactElement | null;
  subject: string;
};

async function sendEmail({ user, type }: SendEmailProps) {
  const emailOptions: EmailOptionsType = {
    from: "Track Dev Time <noreply@track-dev-time.dev>",
    to: user.email,
    react: null,
    subject: "",
  };

  switch (type) {
    case "twoDaysLeft":
      emailOptions.subject = "Only 2 days left — don’t lose your dev flow 🚀";
      emailOptions.react = TrialEndingSoon({
        userName: user.name ?? "",
        userEmail: user.email,
      });
      break;

    case "trialEnded":
      emailOptions.subject =
        "🛑 Your free trial just ended — let’s keep going 💪";
      emailOptions.react = TrialEnded({
        userName: user.name ?? "",
        userEmail: user.email,
      });
      break;

    default:
      throw new Error("Unknown email type");
  }

  try {
    await resend.emails.send(emailOptions);
    console.log(`Sent ${type} email to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${user.email}:`, error);
  }
}

export const sendTrialEmail = async () => {
  const trialDuration = 7;
  const now = new Date();
  const users = await getTrialUsersNotSubscribed(trialDuration);

  if (users.length === 0) return;

  for (const user of users) {
    const trialEndDate = addDays(user.createdAt, trialDuration);
    const diffMs = trialEndDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (daysLeft > 2) continue;

    if (daysLeft === 2) {
      await sendEmail({ user, type: "twoDaysLeft" });
    } else if (daysLeft === 0) {
      await sendEmail({ user, type: "trialEnded" });
    }
  }
};
