import { MotivationMessage } from "./motivation-message";
import { WeeklyGoal } from "./weekly-goal";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";

type HelloProps = {
  name: string;
};

export const Hello = ({ name }: HelloProps) => {
  return (
    <div className="p-5 space-y-4 relative">
      <h1 className="text-3xl font-bold tracking-tight">👋 Hello {name}</h1>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <MotivationMessage />
        <WeeklyGoal />
        <div className="flex gap-2">
          <Link
            href="/dashboard/doc"
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            How to start tracking
            <BookOpenText className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
