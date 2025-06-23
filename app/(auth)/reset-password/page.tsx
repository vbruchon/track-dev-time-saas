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

const resetPasswordFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const receiveTokenFormSchema = z.object({
  email: z.string().email(),
});

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searhParams = useSearchParams();
  const token = searhParams.get("token");

  const emailForm = useForm<z.infer<typeof receiveTokenFormSchema>>({
    resolver: zodResolver(receiveTokenFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmitEmail = (
    values: z.infer<typeof receiveTokenFormSchema>
  ) => {
    authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
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
    values: z.infer<typeof resetPasswordFormSchema>
  ) => {
    authClient.resetPassword(
      {
        token: token ?? "",
        newPassword: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          toast.success("Your password has been updated");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  // --- Token request form ---
  if (!token) {
    return (
      <AuthFormWrapper
        title="Reset your password"
        description="Enter your email to receive a token to reset your password."
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.fr"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading}>Receive token</LoadingButton>
          </form>
        </Form>
      </AuthFormWrapper>
    );
  }

  // --- Password reset form ---
  return (
    <AuthFormWrapper
      title="Reset your password"
      description="You can now create a new password"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton loading={loading}>Reset password</LoadingButton>
        </form>
      </Form>
    </AuthFormWrapper>
  );
}
