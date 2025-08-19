import { GiveMeFeedback } from "@/components/features/dashboard/give-me-feedback";
import { DashboardSidebar } from "@/components/features/dashboard/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getDictionary } from "@/locales/dictionaries";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { lang } = (await params) ?? "en";
  const dict = await getDictionary(lang, "dashboard/layout");
  return (
    <SidebarProvider className="flex item-center gap-2">
      <DashboardSidebar dict={dict} lang={lang} />
      <SidebarTrigger variant={"ghost"} className="md:hidden" />
      <main className="w-full m-2 p-4">{children}</main>
      <div className="fixed bottom-4 right-4 z-[9999]">
        <GiveMeFeedback {...dict.feedback} />
      </div>
    </SidebarProvider>
  );
}
