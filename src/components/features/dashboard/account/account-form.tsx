"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/generated";
import { updateUserAccount } from "@/lib/actions/account.action";
import {
  accountFormSchema,
  AccountFormSchemaType,
} from "@/lib/schema/account-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EditableField } from "./editable-field";
import { EditableAvatarField } from "./editable-avatar-field";
import { ApiKeyField } from "./api-key-field";
import { LoadingButton } from "@/components/loading-button";
import { UpdateUserCredentialsDialog } from "./update-user-credentials-dialog";
import { StatusIndicatorTooltip } from "../status-indicator-tooltip";
import { VerifyEmailButton } from "./verify-email-button";

type AccountFormProps = {
  user: User;
};

export const AccountForm = ({ user }: AccountFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const weeklyGoalHours = user.weeklyGoalSeconds
    ? Math.floor(user.weeklyGoalSeconds / 3600)
    : 0;

  const form = useForm<AccountFormSchemaType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      imageUrl: user.image ?? "",
      name: user.name ?? "",
      email: user.email,
      weeklyGoal: weeklyGoalHours,
      apiKey: user.apiKey ?? "",
    },
  });

  const onSubmit = async (values: AccountFormSchemaType) => {
    setLoading(true);
    try {
      await updateUserAccount(values);
      toast.success("Account updated");
      router.refresh();
    } catch {
      toast.error("Failed to update account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <EditableAvatarField
                  initialImage={user.image ?? ""}
                  fallback={user.name?.[0]?.toUpperCase()}
                  onChange={field.onChange}
                  type="text"
                  placeholder="https://google.image.com"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <EditableField
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Enter your name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2">
                    <FormLabel>Email</FormLabel>
                    <StatusIndicatorTooltip
                      isValid={user.emailVerified}
                      labelIfValid="Your email is verified"
                      labelIfInvalid="Your email is not verified"
                    />
                    <VerifyEmailButton
                      isVerified={user.emailVerified}
                      email={user.email}
                    />
                  </div>
                  <EditableField
                    type="email"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    isEditable={false}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ApiKeyField
            control={form.control}
            initialApiKey={user.apiKey ?? ""}
          />
          <FormField
            control={form.control}
            name="weeklyGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Weekly Goal (hours)</FormLabel>
                <EditableField
                  type="number"
                  placeholder="Ex: 15"
                  value={field.value ?? ""}
                  onChange={(val) => {
                    const parsed = Number(val);
                    if (!isNaN(parsed)) field.onChange(parsed);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <LoadingButton type="submit" loading={loading} className="w-fit">
              Save changes
            </LoadingButton>
          </div>
        </form>
      </Form>
      <UpdateUserCredentialsDialog type="email" currentEmail={user.email} />
      <UpdateUserCredentialsDialog type="password" />
    </>
  );
};
