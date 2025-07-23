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
import { Loader2, Plus } from "lucide-react";
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
import { Technology } from "@/generated";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { updateProjectTechnology } from "@/lib/actions/manage-technology.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const sortTechnologies = (
  technologies: Technology[],
  selectedTechs: string[]
) => {
  return [...technologies].sort((a, b) => {
    const aSelected = selectedTechs.includes(a.name);
    const bSelected = selectedTechs.includes(b.name);

    if (aSelected === bSelected) {
      return a.name.localeCompare(b.name);
    }
    return aSelected ? -1 : 1;
  });
};

type ManageTechnologyDialogProps = {
  projectId: string;
  projectTechnologies: Technology[];
};

const formSchema = z.object({
  technologies: z.array(z.string()).optional(),
  newTechnology: z.string().optional(),
});

export const ManageTechnologyDialog = ({
  projectId,
  projectTechnologies,
}: ManageTechnologyDialogProps) => {
  const {
    data: technologies = [],
    mutate,
    isLoading,
  } = useSWR("/api/technologies", fetcher);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technologies: projectTechnologies.map((techno) => techno.name),
      newTechnology: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const selectedTechnology = values.technologies || [];
    const newTechnology = values.newTechnology?.trim() || undefined;

    try {
      await updateProjectTechnology({
        projectId,
        technologyNames: selectedTechnology,
        newTechnology: newTechnology,
      });
      toast.success("Technologies have been updated successfully.");
      setOpen(false);
      router.refresh();
      await mutate();
    } catch (error) {
      toast.error("An error occurred while updating the technologies.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      form.reset({
        technologies: projectTechnologies.map((tech) => tech.name),
        newTechnology: "",
      });
    }
  }, [open, projectTechnologies, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Plus className="size-4 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>Manage technologies</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage technologies of your project</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => {
                  const selectedTechs = field.value || [];

                  const sortedTechnologies = sortTechnologies(
                    technologies,
                    selectedTechs
                  );

                  return (
                    <FormItem>
                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                        {sortedTechnologies.map((technology) => (
                          <FormItem
                            key={technology.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={selectedTechs.includes(
                                  technology.name
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...selectedTechs,
                                      technology.name,
                                    ]);
                                  } else {
                                    field.onChange(
                                      selectedTechs.filter(
                                        (name) => name !== technology.name
                                      )
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {technology.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="newTechnology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add new technology</FormLabel>
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="React | Node.js | "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Confirm</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
