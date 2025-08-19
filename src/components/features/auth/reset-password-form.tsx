"use client";

import { AuthFormWrapper } from "@/components/features/auth/auth-form-wrapper";
import { LoadingButton } from "@/components/loading-button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ResetDict = {
  tokenRequest: {
    title: string;
    description: string;
    labels: { email: string };
    placeholders: { email: string };
    submit: string;
  };
  passwordReset: {
    title: string;
    description: string;
    labels: { password: string };
    placeholders: { password: string };
    submit: string;
  };
};

const resetPasswordFormSchema = (dict: ResetDict["passwordReset"]) =>
  z.object({
    password: z.string().min(6, {
      message: dict.labels.password + " must be at least 6 characters",
    }),
  });

const receiveTokenFormSchema = (dict: ResetDict["tokenRequest"]) =>
  z.object({
    email: z.string().email({ message: dict.labels.email + " is invalid" }),
  });

interface ResetPasswordFormProps {
  dict: ResetDict;
}

export default function ResetPasswordForm({ dict }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const emailForm = useForm<z.infer<ReturnType<typeof receiveTokenFormSchema>>>(
    {
      resolver: zodResolver(receiveTokenFormSchema(dict.tokenRequest)),
      defaultValues: { email: "" },
    }
  );

  const passwordForm = useForm<
    z.infer<ReturnType<typeof resetPasswordFormSchema>>
  >({
    resolver: zodResolver(resetPasswordFormSchema(dict.passwordReset)),
    defaultValues: { password: "" },
  });

  const handleSubmitEmail = (
    values: z.infer<ReturnType<typeof receiveTokenFormSchema>>
  ) => {
    authClient.forgetPassword(
      { email: values.email, redirectTo: "/reset-password" },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          router.push("/verify");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const handleSubmitPassword = (
    values: z.infer<ReturnType<typeof resetPasswordFormSchema>>
  ) => {
    authClient.resetPassword(
      { token: token ?? "", newPassword: values.password },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          toast.success("Your password has been updated");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  if (!token) {
    return (
      <AuthFormWrapper
        title={dict.tokenRequest.title}
        description={dict.tokenRequest.description}
      >
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleSubmitEmail)}
            className="space-y-8"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.tokenRequest.labels.email}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={dict.tokenRequest.placeholders.email}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading}>
              {dict.tokenRequest.submit}
            </LoadingButton>
          </form>
        </Form>
      </AuthFormWrapper>
    );
  }

  return (
    <AuthFormWrapper
      title={dict.passwordReset.title}
      description={dict.passwordReset.description}
    >
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(handleSubmitPassword)}
          className="space-y-8"
        >
          <FormField
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.passwordReset.labels.password}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={dict.passwordReset.placeholders.password}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton loading={loading}>
            {dict.passwordReset.submit}
          </LoadingButton>
        </form>
      </Form>
    </AuthFormWrapper>
  );
}
