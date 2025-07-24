"use client";

import { Form } from "@/components/ui/form";
import { User } from "@/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  apiKeyFormSchema,
  ApiKeyFormSchemaType,
} from "@/lib/schema/api-key-form-schema";
import { ApiKeyDocsField } from "./api-key-docs-field";

type ApiKeyFormProps = {
  user: User;
};

export const ApiKeyForm = ({ user }: ApiKeyFormProps) => {
  const form = useForm<ApiKeyFormSchemaType>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      apiKey: user.apiKey ?? "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-6">
          <ApiKeyDocsField
            control={form.control}
            initialApiKey={user.apiKey ?? ""}
          />
        </form>
      </Form>
    </>
  );
};
