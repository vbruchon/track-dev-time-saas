"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Categories, Category } from "@/generated";
import { updateProjectCategory } from "@/lib/actions/manage-category.action";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categoriesList = Object.values(Categories) as string[];
const formSchema = z.object({
  categories: z
    .array(z.enum([...(categoriesList as [string, ...string[]])]))
    .optional(),
});

type ManageCategoryDialogProps = {
  projectId: string;
  projectCategories: Category[];
};

export const ManageCategoryDialog = ({
  projectId,
  projectCategories,
}: ManageCategoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: projectCategories.map((cat) => cat.name as Categories),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const selectedCategories = values.categories || [];

    try {
      await updateProjectCategory(
        projectId,
        selectedCategories as Categories[]
      );
      toast.success("Categories have been updated successfully.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("An error occurred while updating the categories.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Manage category</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-col gap-2">
                    {categoriesList.map((category) => (
                      <FormField
                        key={category}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category)}
                                  onCheckedChange={(checked: boolean) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value!,
                                          category,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (c) => c !== category
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {category}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Valider</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
