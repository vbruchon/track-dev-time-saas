"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CopyButton } from "../button/copy-button";
import { ToggleVisibilityButton } from "../button/toogle-visibility-button";
import { GenerateButton } from "../button/generate-button";
import { generateApiKey } from "@/lib/actions/generate-api-key.action";
import Link from "next/link";
import { Control } from "react-hook-form";
import { AccountFormSchemaType } from "@/lib/schema/account-form-schema";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { KeyRound } from "lucide-react";

export type ApiKeyFieldProps = {
  control: Control<AccountFormSchemaType>;
  initialApiKey: string;
  label: string;
  alertTitle: string;
  description: string;
};

export const ApiKeyField = ({
  control,
  initialApiKey,
  label,
  alertTitle,
  description,
}: ApiKeyFieldProps) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow((prev) => !prev);

  return (
    <FormField
      control={control}
      name="apiKey"
      render={({ field }) => {
        const handleGenerate = async () => {
          const newApiKey = await generateApiKey();
          setApiKey(newApiKey);
          setShow(true);
          field.onChange(newApiKey);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <div className="flex gap-2 items-center">
              {!apiKey ? (
                <Alert variant="destructive">
                  <KeyRound className="size-4" />
                  <AlertTitle>{alertTitle}</AlertTitle>
                </Alert>
              ) : (
                <FormControl>
                  <Input
                    type={show ? "text" : "password"}
                    {...field}
                    value={apiKey}
                    className="flex-1"
                    readOnly
                    disabled
                  />
                </FormControl>
              )}
              {apiKey && (
                <ToggleVisibilityButton
                  value={show}
                  onToggle={toggleVisibility}
                />
              )}
              <GenerateButton onGenerate={handleGenerate} />
              {apiKey && <CopyButton value={apiKey} />}{" "}
            </div>

            <FormMessage />

            <FormDescription className="text-foreground text-xs ml-2 mt-2">
              {description}{" "}
              <Link
                href="/dashboard/docs"
                className="underline underline-offset-2 text-indigo-500"
              >
                documentation
              </Link>
              .
            </FormDescription>
          </FormItem>
        );
      }}
    />
  );
};
