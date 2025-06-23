"use client";
import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { MagicLinkForm } from "@/components/features/auth/magic-link-form";
import { SigninForm } from "@/components/features/auth/sigin-form";
import { SocialAuthButton } from "@/components/features/auth/social-auth-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [isMagicLink, setIsMagicLink] = useState(false);

  return (
    <AuthFormWrapper title="Sign in to Track-dev-time">
      {isMagicLink ? <MagicLinkForm /> : <SigninForm />}
      <Button
        variant="link"
        className="text-center w-full text-indigo-500 text-xs no-underline hover:no-underline transition-transform duration-200 hover:scale-105"
        onClick={() => setIsMagicLink((s) => !s)}
      >
        {isMagicLink ? "Login with password" : "Login with magic link instead"}
      </Button>

      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <SocialAuthButton provider="github" />
        <SocialAuthButton provider="google" />
      </div>

      <p className="text-muted-foreground w-full text-center text-xs mt-6">
        No account?{" "}
        <Link className="text-indigo-500" href="/sign-up">
          Sign Up.
        </Link>
      </p>
    </AuthFormWrapper>
  );
}
