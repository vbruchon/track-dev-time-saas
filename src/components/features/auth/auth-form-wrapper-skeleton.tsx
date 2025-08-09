import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthFormWrapperSkeleton = () => {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <CardTitle className="sm:text-center">
          <Skeleton className="mx-auto h-6 w-48 rounded" />
        </CardTitle>
        <CardDescription className="sm:text-center">
          <Skeleton className="mx-auto h-4 w-64 rounded" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-full max-w-md rounded" />
        <Skeleton className="h-8 w-full max-w-md rounded" />
        <Skeleton className="h-8 w-full max-w-md rounded" />
        <Skeleton className="mx-auto mt-6 h-10 w-32 rounded" />
      </CardContent>
    </Card>
  );
};
