import { SupportForm } from "@/components/features/dashboard/support/support-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Support</CardTitle>
          <CardDescription className="text-foreground mt-2">
            Facing a bug, have a question, or need help? Let us know what’s
            going on — we’ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupportForm />
        </CardContent>
      </Card>
    </div>
  );
}
