"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/loading-button";
import { AnimatedSubmitLabel } from "./animated-submit-label";
import { PasswordField } from "./password-field";
import { useState } from "react";
import z from "zod";
import { signIn } from "@/lib/auth-client";

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;

export function SigninForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignInFormSchemaType) {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Your account has been created !");
          setLoading(false);
          router.push("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordField disabled={loading} form={form} />

        <LoadingButton loading={loading}>
          <AnimatedSubmitLabel isMagicLink={false} />
        </LoadingButton>
      </form>
    </Form>
  );
}
