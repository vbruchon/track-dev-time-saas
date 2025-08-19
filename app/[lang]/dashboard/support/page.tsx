import { SupportForm } from "@/components/features/dashboard/support/support-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDictionary } from "@/locales/dictionaries";

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "dashboard/support");

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {dict.supportPage.title}
          </CardTitle>
          <CardDescription className="text-foreground mt-2">
            {dict.supportPage.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupportForm {...dict.supportPage} />
        </CardContent>
      </Card>
    </div>
  );
}
