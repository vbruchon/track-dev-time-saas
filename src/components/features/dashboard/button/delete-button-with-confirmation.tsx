"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, Trash } from "lucide-react";
import { useState } from "react";
import { deleteProject } from "@/utils/[projectId]/project.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProjectHeaderDict } from "../projects/[projectId]/project-header";

type DeleteButtonWithConfirmationProps = {
  name: string;
  projectId: string;
  dict: ProjectHeaderDict;
};

export const DeleteButtonWithConfirmation = ({
  name,
  projectId,
  dict,
}: DeleteButtonWithConfirmationProps) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          {dict.deleteButton.buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {dict.deleteButton.dialogTitle}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {dict.deleteButton.dialogDescription}{" "}
              <span className="text-foreground">{name}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={"project-name"}>
              {" "}
              {dict.deleteButton.dialogLabel}
            </Label>
            <Input
              id="project-name"
              type="text"
              placeholder={dict.deleteButton.placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={cn(
                inputValue === name
                  ? "border-primary focus-visible:border-primary"
                  : "border-destructive focus-visible:border-transparent focus-visible:ring-destructive/50"
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                {dict.deleteButton.dialogCancel}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant={"destructive"}
              className="flex-1"
              disabled={inputValue !== name || loading}
              onClick={async () => {
                setLoading(true);
                try {
                  await deleteProject(projectId);
                  toast.success("Your project has been deleted");
                  router.push("/dashboard/projects");
                } catch (err) {
                  console.error("Erreur suppression :", err);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading
                ? dict.deleteButton.dialogLoading
                : dict.deleteButton.dialogDelete}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
