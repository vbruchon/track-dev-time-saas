"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { getUser } from "../auth-session";
import { stripe } from "../stripe";
import { SubscriptionPlan } from "@/generated";

type BodyType = {
  plan: SubscriptionPlan;
  referenceId: string;
  subscriptionId?: string;
  successUrl: string;
  cancelUrl: string;
  disableRedirect: boolean;
};

export async function upgradeSubscription(formData: FormData) {
  const billing = formData.get("billing");

  if (billing !== "month" && billing !== "year") {
    throw new Error("Invalid billing interval");
  }

  const plan = billing === "year" ? "pro_yearly" : "pro_monthly";

  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
  if (!user.stripeCustomerId) throw new Error("Missing Stripe customer ID");

  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
    status: "all",
    limit: 10,
  });

  const validSubscription = subscriptions.data.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );
  console.log("validSubscription:", validSubscription);

  const body: BodyType = {
    plan: plan,
    referenceId: user.id,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
    disableRedirect: true,
  };

  if (validSubscription) {
    const currentPriceId = validSubscription.items.data[0].price.id;
    const expectedPriceId =
      billing === "year"
        ? process.env.STRIPE_PRO_YEARLY_PRICE_ID
        : process.env.STRIPE_PRO_MONTHLY_PRICE_ID;

    if (currentPriceId === expectedPriceId) {
      throw new Error("You are already subscribed to this plan.");
    } else {
      body.subscriptionId = validSubscription.id;
    }
  }

  const session = await auth.api.upgradeSubscription({
    body,
    headers: await headers(),
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe Checkout session");
  }

  redirect(session.url);
}
