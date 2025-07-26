"use client";

import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { sendSupportMessage } from "@/lib/actions/support.action";
import {
  supportFormSchema,
  SupportFormSchemaType,
} from "@/lib/schema/support-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const SupportForm = () => {
  const form = useForm<SupportFormSchemaType>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      supportMessage: "",
    },
  });

  const onSubmit = async (values: SupportFormSchemaType) => {
    try {
      await sendSupportMessage(values);
      toast.success("Thanks! Your message has been sent.");
      form.reset();
    } catch {
      toast.error("An error occurred while sending your message.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="supportMessage"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your issue or question in detail..."
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Send message
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
