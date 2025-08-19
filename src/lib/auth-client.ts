import { createAuthClient } from "better-auth/react";
import { magicLinkClient, adminClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    magicLinkClient(),
    stripeClient({
      subscription: true,
    }),
    adminClient(),
  ],
});

export const { signIn, signUp, useSession } = createAuthClient();
