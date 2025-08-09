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
  onSuccess?: () => void;
};

export const FeedbackForm = ({ onSuccess }: FeedbackFormProps) => {
  const form = useForm<FeedbackFormSchemaType>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const onSubmit = async (values: FeedbackFormSchemaType) => {
    try {
      await sendFeedBack(values);
      toast.success("Thanks for your feedback");
      onSuccess?.();
    } catch {
      toast.error("An error occurred while sending your feedback.");
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
              <FormLabel>Your feedback</FormLabel>
              <FormDescription>
                Got an idea, frustration, or quick thought? We&apos;d love to
                hear it. For urgent issues or anything blocking your workflow,
                please contact support.
              </FormDescription>

              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What would you like to share?"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Send feedback
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
