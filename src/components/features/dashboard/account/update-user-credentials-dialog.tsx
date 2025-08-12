"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEmailForm } from "./change-email-form";
import { ChangePasswordForm } from "./change-password-form";
import { useState } from "react";

export type UpdateUserCredentialsDialogProps = {
  type: "email" | "password";
  currentEmail?: string;
};
export const UpdateUserCredentialsDialog = ({
  type,
  currentEmail = "",
}: UpdateUserCredentialsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"link"}>
          Change {type}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your {type}</DialogTitle>
        </DialogHeader>
        {type === "email" ? (
          <ChangeEmailForm
            currentEmail={currentEmail}
            onSuccess={() => setOpen(false)}
          />
        ) : (
          <ChangePasswordForm onSuccess={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
};
