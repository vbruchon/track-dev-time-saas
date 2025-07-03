import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex item-center gap-2">
      <DashboardSidebar />
      <SidebarTrigger variant={"ghost"} className="md:hidden" />
      <main className="border-2 w-full m-2 p-4">{children}</main>
    </SidebarProvider>
  );
}
