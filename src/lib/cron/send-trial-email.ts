import { addDays } from "date-fns";
import { prisma } from "../prisma";
import { resend } from "../resend";
import TrialEndingSoon from "../../../emails/trial-ending-soon";
import TrialEnded from "../../../emails/trial-ended";
import { ReactElement } from "react";
import { User } from "@/generated";

function getLocalDateString(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0];
}

function daysBetweenLocalDates(startDate: Date, endDate: Date) {
  const startStr = getLocalDateString(startDate);
  const endStr = getLocalDateString(endDate);

  const start = new Date(startStr);
  const end = new Date(endStr);

  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

async function getTrialUsersNotSubscribed(daysTrial = 7) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const trialStartDate = new Date(now);
  trialStartDate.setDate(trialStartDate.getDate() - (daysTrial + 1));

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

  await resend.emails.send(emailOptions);
}

export const sendTrialEmail = async () => {
  const trialDuration = 7;
  const now = new Date();
  now.setHours(0, 0, 0, 0); // normalize current date to local midnight

  const users = await getTrialUsersNotSubscribed(trialDuration);

  if (users.length === 0) return;

  for (const user of users) {
    const createdAtLocal = new Date(user.createdAt);
    createdAtLocal.setHours(0, 0, 0, 0);

    const trialEndDate = addDays(createdAtLocal, trialDuration);

    const daysLeft = daysBetweenLocalDates(now, trialEndDate);

    if (daysLeft > 2) continue;

    if (daysLeft === 2) {
      await sendEmail({ user, type: "twoDaysLeft" });
    } else if (daysLeft === 0) {
      await sendEmail({ user, type: "trialEnded" });
    }
  }
};
