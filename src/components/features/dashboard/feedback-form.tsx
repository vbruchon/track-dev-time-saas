"use client";
import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedBack } from "@/lib/actions/feedback.action";
import {
  feedbackFormSchema,
  FeedbackFormSchemaType,
} from "@/lib/schema/feedback-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FeedbackFormProps = {
  content: {
    label: string;
    description: string;
    placeholder: string;
    buttonText: string;
    toast: { success: string; error: string };
  };
  onSuccess?: () => void;
};

export const FeedbackForm = ({ content, onSuccess }: FeedbackFormProps) => {
  const form = useForm<FeedbackFormSchemaType>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const onSubmit = async (values: FeedbackFormSchemaType) => {
    try {
      await sendFeedBack(values);
      toast.success(content.toast.success);
      onSuccess?.();
    } catch {
      toast.error(content.toast.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{content.label}</FormLabel>
              <FormDescription>{content.description}</FormDescription>

              <FormControl>
                <Textarea
                  {...field}
                  placeholder={content.placeholder}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {content.buttonText}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
