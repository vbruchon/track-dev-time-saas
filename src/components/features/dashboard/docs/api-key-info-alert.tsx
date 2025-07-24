import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function ApiKeyInfoAlert() {
  return (
    <Alert
      className="my-4 flex items-center gap-4 border border-primary/50  shadow-md p-4 rounded-lg"
      variant={undefined} // supprime le variant par défaut si besoin
    >
      <Info className="flex-shrink-0" />
      <div>
        <AlertTitle className="font-semibold">
          Authentication reminder
        </AlertTitle>
        <AlertDescription className="mt-1 text-sm leading-relaxed">
          <span>
            This step <strong>only needs to be done once</strong>, or{" "}
            <strong>each time you regenerate your API key</strong>. The API key
            is stored globally on your computer and used automatically by the
            CLI.
          </span>
        </AlertDescription>
      </div>
    </Alert>
  );
}
