import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPageLoader() {
  const skeletonCount = 8;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      <div className="grid grid-cols-5 gap-x-4 gap-y-8">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 border-l-4 border-green-700 bg-muted rounded-md shadow-sm px-6 pt-6 pb-2 cursor-wait"
          >
            {/* Titre avec icône */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-24 rounded" />
            </div>

            {/* Badges */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>

            {/* Date */}
            <div className="text-xs text-right mb-auto">
              <Skeleton className="h-4 w-32 ml-auto rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
