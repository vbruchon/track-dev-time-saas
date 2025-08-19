"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import React from "react";
import { FeedbackForm } from "./feedback-form";
import { useState } from "react";

type GiveMeFeedbackProps = {
  dialogTitle: string;
  form: {
    label: string;
    description: string;
    placeholder: string;
    buttonText: string;
    toast: { success: string; error: string };
  };
};

export const GiveMeFeedback = ({ dialogTitle, form }: GiveMeFeedbackProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="rounded-full px-6 py-6">
          <MessageSquare
            className="size-6 -rotate-12"
            fill="#fff"
            stroke="#fff"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <FeedbackForm content={form} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
