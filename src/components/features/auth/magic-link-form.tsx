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
import { useState } from "react";
import z from "zod";
import { authClient } from "@/lib/auth-client";

const MagicLinkFormSchema = z.object({
  email: z.string().email(),
});

type MagicLinkFormSchemaType = z.infer<typeof MagicLinkFormSchema>;

export function MagicLinkForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<MagicLinkFormSchemaType>({
    resolver: zodResolver(MagicLinkFormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: MagicLinkFormSchemaType) {
    await authClient.signIn.magicLink(
      {
        email: values.email,
        callbackURL: "/",
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

        <LoadingButton loading={loading}>
          <AnimatedSubmitLabel isMagicLink={true} />
        </LoadingButton>
      </form>
    </Form>
  );
}
