import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function ApiKeyInfoAlert({
  content,
}: {
  content: { title: string; description: string };
}) {
  return (
    <Alert className="my-4 flex items-center gap-4 border border-destructive/50  shadow-md p-4 rounded-lg">
      <Info className="flex-shrink-0" />
      <div>
        <AlertTitle className="font-semibold">{content.title}</AlertTitle>
        <AlertDescription className="mt-1 text-sm leading-relaxed text-foreground">
          <span>{content.description}</span>
        </AlertDescription>
      </div>
    </Alert>
  );
}
