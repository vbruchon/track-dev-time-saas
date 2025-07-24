"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ApiKeyRegenerateDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRegenerate: () => void;
};

export function ApiKeyRegenerateDialog({
  isOpen,
  onOpenChange,
  onRegenerate,
}: ApiKeyRegenerateDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Regenerate your API key?</AlertDialogTitle>
          <AlertDialogDescription>
            This will revoke your current API key. You will need to
            reauthenticate in your CLI.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onOpenChange(false);
              onRegenerate();
            }}
          >
            Regenerate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
