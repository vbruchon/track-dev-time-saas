"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { generateApiKey } from "@/lib/actions/generate-api-key.action";
import { Control } from "react-hook-form";
import { AccountFormSchemaType } from "@/lib/schema/account-form-schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyRound } from "lucide-react";
import { ApiKeyFormSchemaType } from "@/lib/schema/api-key-form-schema";
import { ToggleVisibilityButton } from "../button/toogle-visibility-button";
import { GenerateButton } from "../button/generate-button";
import { CopyButton } from "../button/copy-button";
import { updateUserApiKey } from "@/lib/actions/update-user-api-key";
import { toast } from "sonner";
import { ApiKeyRegenerateDialog } from "./api-key-regenerate-dialog";

export type ApiKeyDocsFieldProps = {
  control: Control<AccountFormSchemaType | ApiKeyFormSchemaType>;
  initialApiKey: string;
};

export const ApiKeyDocsField = ({
  control,
  initialApiKey,
}: ApiKeyDocsFieldProps) => {
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [show, setShow] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onChangeRef = useRef<(value: string) => void>(() => {});

  const toggleVisibility = () => setShow((prev) => !prev);

  const generateAndSaveKey = async (fieldOnChange: (val: string) => void) => {
    try {
      const newApiKey = await generateApiKey();
      setApiKey(newApiKey);
      setShow(true);
      fieldOnChange(newApiKey);
      await updateUserApiKey({ apiKey: newApiKey });
      toast.success("Your ApiKey has been saved in database");
    } catch {
      toast.error("Failed to generate ApiKey");
    }
  };

  return (
    <>
      <FormField
        control={control}
        name="apiKey"
        render={({ field }) => {
          const onGenerateClick = () => {
            onChangeRef.current = field.onChange;

            if (apiKey) {
              setIsDialogOpen(true);
            } else {
              generateAndSaveKey(field.onChange);
            }
          };
          return (
            <FormItem>
              <div className="flex gap-2 items-center">
                {!apiKey ? (
                  <Alert variant="destructive">
                    <KeyRound className="size-4" />
                    <AlertTitle>
                      You need to generate your API key to link your dashboard
                      with your CLI.
                    </AlertTitle>
                    <AlertDescription></AlertDescription>
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
                <GenerateButton onGenerate={onGenerateClick} />
                {apiKey && <CopyButton value={apiKey} />}
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <ApiKeyRegenerateDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onRegenerate={() => generateAndSaveKey(onChangeRef.current)}
      />
    </>
  );
};
