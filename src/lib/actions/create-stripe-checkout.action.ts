"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { getUser } from "../auth-session";

export async function upgradeSubscription(formData: FormData) {
  const billing = formData.get("billing");
  if (billing !== "month" && billing !== "year") {
    throw new Error("Invalid billing interval");
  }
  const isAnnual = billing === "year";

  const plan = isAnnual ? "pro_yearly" : "pro_monthly";

  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const session = await auth.api.upgradeSubscription({
    body: {
      plan: plan,
      annual: isAnnual,
      referenceId: user.id,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
      disableRedirect: true,
    },
    headers: await headers(),
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe Checkout session");
  }

  redirect(session.url);
}
