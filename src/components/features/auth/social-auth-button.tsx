"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-button";

type SupportedProvider = "github" | "google";

type SocialAuthButtonProps = {
  provider: SupportedProvider;
  callbackURL?: string;
  text: string;
};

export const SocialAuthButton = ({
  provider,
  callbackURL = "/",
  text,
}: SocialAuthButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <LoadingButton
      variants={"outline"}
      loading={isLoading}
      onClick={handleClick}
      type="button"
      className="flex-1 hover:bg-muted hover:text-muted-foreground justify-center min-w-[160px]"
    >
      {text}
    </LoadingButton>
  );
};
