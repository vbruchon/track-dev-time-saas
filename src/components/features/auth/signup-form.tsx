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
import { PasswordField } from "./password-field";
import z from "zod";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";

type SignUpFormDict = {
  labels: { name: string; email: string; password: string };
  placeholders: { name: string; email: string; password: string };
  errors: {
    nameTooShort: string;
    emailInvalid: string;
    passwordTooShort: string;
  };
  submit: string;
};

const SignUpFormSchema = (dictForm: SignUpFormDict) =>
  z.object({
    email: z.string().email({ message: dictForm.errors.emailInvalid }),
    name: z.string().min(2, { message: dictForm.errors.nameTooShort }),
    password: z.string().min(8, { message: dictForm.errors.passwordTooShort }),
  });

type SignUpFormSchemaType = z.infer<ReturnType<typeof SignUpFormSchema>>;

interface SignUpFormProps {
  dictForm: SignUpFormDict;
}

export function SignUpForm({ dictForm }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema(dictForm)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormSchemaType) {
    await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictForm.labels.name}</FormLabel>
              <FormControl>
                <Input
                  placeholder={dictForm.placeholders.name}
                  disabled={loading}
                  aria-busy={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictForm.labels.email}</FormLabel>
              <FormControl>
                <Input
                  placeholder={dictForm.placeholders.email}
                  disabled={loading}
                  aria-busy={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordField
          disabled={loading}
          aria-busy={loading}
          form={form}
          mode="signup"
        />
        <LoadingButton loading={loading}>{dictForm.submit}</LoadingButton>
      </form>
    </Form>
  );
}
