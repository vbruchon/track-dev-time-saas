"use client";

import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { MagicLinkForm } from "@/components/features/auth/magic-link-form";
import { SigninForm } from "@/components/features/auth/sigin-form";
import { SocialAuthButton } from "@/components/features/auth/social-auth-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";

interface SignInCardFormProps {
  dict: {
    title: string;
    toggleMagicLink: { enable: string; disable: string };
    or: string;
    noAccount: string;
    signUp: string;
    continueWith: { github: string; google: string };
  };
}

export default function SignInCardForm({ dict }: SignInCardFormProps) {
  const [isMagicLink, setIsMagicLink] = useState(false);

  return (
    <AuthFormWrapper title={dict.title}>
      {isMagicLink ? <MagicLinkForm /> : <SigninForm />}
      <Button
        variant="link"
        className="text-center w-full text-indigo-500 text-xs no-underline hover:no-underline transition-transform duration-200 hover:scale-105"
        onClick={() => setIsMagicLink((s) => !s)}
      >
        {isMagicLink
          ? dict.toggleMagicLink.enable
          : dict.toggleMagicLink.disable}
      </Button>

      <div className="flex items-center gap-4 my-6">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{dict.or}</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <SocialAuthButton text={dict.continueWith.github} provider="github" />
        <SocialAuthButton text={dict.continueWith.google} provider="google" />
      </div>

      <p className="text-muted-foreground w-full text-center text-xs mt-6">
        {dict.noAccount}{" "}
        <Link className="text-indigo-500" href="/sign-up">
          {dict.signUp}
        </Link>
      </p>
    </AuthFormWrapper>
  );
}
