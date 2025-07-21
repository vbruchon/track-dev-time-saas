"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordField } from "./password-field";

const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

type ChangePasswordFormSchemaType = z.infer<typeof changePasswordFormSchema>;

export const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordFormSchemaType>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormSchemaType) => {
    try {
      await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true,
      });
      toast.success("Password successfully changed.");
      form.reset();
    } catch {
      toast.error("Failed to change password.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PasswordField
          control={form.control}
          name="currentPassword"
          label="Current password"
          placeholder="Current password"
        />
        <PasswordField
          control={form.control}
          name="newPassword"
          label="New password"
          placeholder="New password"
        />
        <PasswordField
          control={form.control}
          name="confirmNewPassword"
          label="Confirm new password"
          placeholder="Confirm new password"
        />

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="w-fit"
          >
            Save changes
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};
