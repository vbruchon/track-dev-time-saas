import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAccountPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>

          {/* Name & Email Fields */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <Skeleton className="h-10 w-full lg:w-1/2" />
            <Skeleton className="h-10 w-full lg:w-1/2" />
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Weekly Goal */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
