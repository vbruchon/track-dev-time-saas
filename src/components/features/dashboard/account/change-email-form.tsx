import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { z } from "zod";

const changeEmailFormSchema = z.object({
  newEmail: z.string().email(),
});

type ChangeEmailFormSchemaType = z.infer<typeof changeEmailFormSchema>;

export const ChangeEmailForm = ({
  currentEmail,
  onSuccess,
}: {
  currentEmail: string;
  onSuccess?: () => void;
}) => {
  const form = useForm<ChangeEmailFormSchemaType>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async (values: ChangeEmailFormSchemaType) => {
    try {
      await authClient.changeEmail({
        newEmail: values.newEmail,
        callbackURL: "/dashboard",
      });
      toast.success("Confirmation email sent to your current address.");
      onSuccess?.();
    } catch {
      toast.error("Failed to initiate email change.");
    }
  };

  return (
    <>
      <div>
        <p className="text-sm">
          Your current email : <span className="text-base">{currentEmail}</span>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">New Email</FormLabel>
                <FormControl>
                  <Input placeholder="exampe@email.com" {...field} />
                </FormControl>
                <FormDescription className="flex items-center gap-2 text-xs justify-center my-2">
                  <AlertTriangle className="size-8" />
                  We&apos;ll send a confirmation link to your current email.
                  Once you approve it, your new email will be set and a
                  verification link will be sent to it.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton
              type="submit"
              loading={form.formState.isSubmitting}
              className="w-fit"
            >
              Save changes
            </LoadingButton>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
