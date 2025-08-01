import { GiveMeFeedback } from "@/components/features/dashboard/give-me-feedback";
import { DashboardSidebar } from "@/components/features/dashboard/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex item-center gap-2">
      <DashboardSidebar />
      <SidebarTrigger variant={"ghost"} className="md:hidden" />
      <main className="w-full m-2 p-4">{children}</main>
      <div className="fixed bottom-4 right-4 z-[9999]">
        <GiveMeFeedback />
      </div>
    </SidebarProvider>
  );
}
