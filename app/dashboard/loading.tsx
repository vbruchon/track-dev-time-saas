import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SectionWrapper } from "@/components/features/dashboard/projects/[projectId]/section-wrapper";
import { Flame, Timer } from "lucide-react";

export default function LoadingHello() {
  return (
    <div className="py-6 space-y-7 relative animate-pulse">
      {/* Titre */}
      <Skeleton className="h-10 w-80 rounded-md mb-4" />

      {/* Zone flex contenant MotivationMessage, WeeklyGoal, et bouton */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Skeleton MotivationMessage (simulé par un rectangle) */}
        <Skeleton className="h-8 w-64 rounded-md" />

        {/* Skeleton WeeklyGoal (barre + texte) */}
        <div className="relative max-w-md sm:max-w-lg sm:flex sm:items-center">
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-5 w-60 rounded-md" />
            <div className="w-[250px] h-2 rounded bg-muted overflow-hidden">
              <Skeleton className="h-full w-3/4 rounded-md" />
            </div>
          </div>
        </div>

        {/* Skeleton bouton */}
        <div>
          <Skeleton
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "h-9 w-48 rounded-md"
            )}
          />
        </div>
      </div>
      <SectionWrapper title="Productivity Overview" icon={<Timer />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="space-y-12 bg-muted rounded-xl py-6 px-4 h-36"
            >
              <Skeleton className="h-8 w-3/5 rounded-md" /> {/* title */}
              <Skeleton className="h-6 w-10 rounded-md" /> {/* value */}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Sessions Overview" icon={<Flame />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="space-y-12 bg-muted rounded-xl py-6 px-4 h-36"
            >
              <Skeleton className="h-8 w-3/5 rounded-md" /> {/* title */}
              <Skeleton className="h-6 w-10 rounded-md" /> {/* value */}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
          <Skeleton className="h-80 rounded-lg" /> {/* chart */}
          <Skeleton className="h-80 rounded-lg" /> {/* chart */}
        </div>
        <div className="mt-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md" /> /* rows */
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
