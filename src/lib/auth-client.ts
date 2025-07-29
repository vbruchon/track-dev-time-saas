import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    magicLinkClient(),
    stripeClient({
      subscription: true,
    }),
  ],
});

export const { signIn, signUp, useSession } = createAuthClient();
