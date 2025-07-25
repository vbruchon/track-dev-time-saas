import { SectionWrapper } from "@/components/features/dashboard/projects/[projectId]/section-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, ChartSpline, TableOfContents } from "lucide-react";

export default function LoadingProjectPage() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-12 w-3/5 rounded-xl" /> {/* title */}
          <Skeleton className="h-9 w-32 rounded-xl" /> {/* button */}
        </div>
        <div className="flex items-center gap-6 p-2">
          <Skeleton className="h-5 w-40 rounded-md" /> {/* created at */}
          <Skeleton className="h-5 w-48 rounded-md" /> {/* last session */}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* categories badges */}
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* technologies badges */}
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-24 rounded-full" />
          ))}
        </div>
      </div>

      <SectionWrapper title="General Stats" icon={<Activity size={24} />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
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

      <SectionWrapper
        title="Time Spent Visualization"
        icon={<ChartSpline size={24} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-80 md:col-span-3 rounded-lg" />
          <Skeleton className="h-80 rounded-lg md:col-span-2" /> {/* chart */}
          <Skeleton className="h-80 rounded-lg" /> {/* chart */}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Sessions List"
        icon={<TableOfContents size={24} />}
      >
        <div className="mt-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md" /> /* rows */
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
