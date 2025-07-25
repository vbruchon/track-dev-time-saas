import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldOff } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <ShieldOff className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="text-sm space-y-1">
            <p>You don&lsquo;t have permission to access this page.</p>
            <p>Please sign in.</p>
          </div>

          <div className="flex justify-center gap-2">
            <Link href="/sign-in">
              <Button variant="default">SignIn</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
