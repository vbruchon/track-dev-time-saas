import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import MagicLinkEmail from "../../emails/magic-link";
import ResetPasswordEmail from "../../emails/reset-password";
import ChangeEmailVerification from "../../emails/change-email-verification";
import { VerifyEmail } from "../../emails/verifiy-email";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await resend.emails.send({
          from: "Track Dev Time <noreply@track-dev-time.dev>",
          to: user.email,
          subject: "Confirm your email change request",
          react: ChangeEmailVerification({
            redirectTo: url,
            userName: user.name,
            newEmail,
          }),
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Track Dev Time <noreply@track-dev-time.dev>",
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({ resetLink: url, userName: user.name }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending verify email to", user.email, "url:", url);

      await resend.emails.send({
        from: "Track Dev Time <noreply@track-dev-time.dev>",
        to: user.email,
        subject: "Verify your email",
        react: VerifyEmail({
          verificationLink: url,
          userName: user.name ?? "there",
        }),
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
          from: "Track Dev Time <noreply@track-dev-time.dev>",
          to: email,
          subject: "Magic Link",
          react: MagicLinkEmail({ magicLink: url }),
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
