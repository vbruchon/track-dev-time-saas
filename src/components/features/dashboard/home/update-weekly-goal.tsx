"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  weeklyGoal: z
    .number({ invalid_type_error: "Please enter a number" })
    .min(0, "Must be at least 0")
    .max(168, "Can't exceed 168 hours (one week)"),
});

export function UpdateWeeklyGoal() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weeklyGoal: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const weeklyGoalSeconds = Math.floor(values.weeklyGoal * 3600);
      const res = await fetch("/api/user/weekly-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weeklyGoalSeconds }),
      });

      if (!res.ok) throw new Error("Failed to update weekly goal");
      router.refresh();
      toast.success("Weekly goal updated successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Pencil className="size-4 hover:cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Update weeklyGoal</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update your weekly goal (hours)</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="weeklyGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Goal (in hours)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={168}
                      step={0.5}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-between mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
