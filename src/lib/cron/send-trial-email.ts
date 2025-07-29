import { addDays, subDays } from "date-fns";
import { prisma } from "../prisma";
import { resend } from "../resend";

export const sendTrialEmail = async (dryRun = false) => {
  const sevenDaysAgo = subDays(new Date(), 7);

  const usersInTrial = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
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

  const usersInTrialNotSubscribed = usersInTrial.filter(
    (user) => !subscribedUserIds.has(user.id)
  );

  if (usersInTrialNotSubscribed.length === 0) return;

  const now = new Date();

  for (const user of usersInTrialNotSubscribed) {
    const trialEndDate = addDays(user.createdAt, 7);
    const daysLeft = Math.ceil(
      (trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft > 2) continue;

    if (daysLeft === 2) {
      if (dryRun) {
        console.log(`[DRY RUN] Would send 2-days-left email to ${user.email}`);
      } else {
        try {
          await resend.emails.send({
            from: "contact@vivianb.fr",
            to: user.email,
            subject: "Only 2 days left — don’t lose your dev flow 🚀",
            html: `<p>Hi ${user.name ?? user.email},</p>
<p>Your <strong>Track Dev Time</strong> trial wraps up in just <strong>2 days</strong>! ⏳</p>
<p>If you’ve been enjoying the productivity boost, now’s the time to go Pro and keep that momentum going.</p>
<p>Don’t worry — your data is safe. But you’ll need to upgrade to keep tracking your sessions automatically.</p>
<p><a href="https://trackdevtime.com/dashboard/subscribe">Upgrade now →</a></p>
<p>Keep shipping,</p>
<p>The Track Dev Time team 💻</p>`,
          });
          console.log(`Sent 2-days-left email to ${user.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
        }
      }
      continue;
    }

    if (daysLeft === 0) {
      if (dryRun) {
        console.log(`[DRY RUN] Would send trial-ended email to ${user.email}`);
      } else {
        try {
          await resend.emails.send({
            from: "contact@vivianb.fr",
            to: user.email,
            subject: "🛑 Your free trial just ended — let’s keep going 💪",
            html: `<p>Hi ${user.name ?? user.email},</p>
<p>Your free trial of <strong>Track Dev Time</strong> just ended.</p>
<p>But no worries — your data’s still here, waiting for you.</p>
<p>Upgrade to Pro and pick up right where you left off. Let’s keep crushing those dev sessions together 🚀</p>
<p><a href="https://trackdevtime.com/dashboard/subscribe">Go Pro →</a></p>
<p>Talk soon,</p>
<p>The Track Dev Time team 👨‍💻</p>`,
          });
          console.log(`Sent trial-ended email to ${user.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
        }
      }
    }
  }
};

sendTrialEmail(true)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
