"use server";

import { getUser } from "@/lib/auth-session";
import { redirect } from "next/navigation";
import { stripe } from "../stripe";

export async function getStripePortalUrl() {
  const user = await getUser();

  if (!user || !user.stripeCustomerId) {
    throw new Error("Unauthorized or missing Stripe Customer ID");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  redirect(portalSession.url);
}
