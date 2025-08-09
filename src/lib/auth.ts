import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL!,
          to: user.email,
          subject: "Confirm your email change request",
          text: `
Hi ${user.name ?? "there"},

We received a request to change the email address for your Track Dev Time account to: ${newEmail}.

If you made this request, please confirm it by clicking the link below:

${url}

If you did not request this change, you can safely ignore this email — your email address will remain unchanged.

Thanks,  
The Track Dev Time Team
    `.trim(),
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL!,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL!,
        to: user.email,
        subject: "Verify your email",
        html: `
        <p>Hi ${user.name ?? "there"},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${url}">Verify my email</a>
      `,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL!,
          to: email,
          subject: "Magic Link",
          text: `Hello! click here for connect to track-dev-time. ${url}`,
        });
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        authorizeReference: async ({ user, referenceId }) => {
          return user.id === referenceId;
        },
        plans: [
          {
            name: "pro_yearly",
            priceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
          },
          {
            name: "pro_monthly",
            priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
          },
        ],
      },
    }),
    nextCookies(),
  ],
});
