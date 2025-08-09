import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./sidebar-header";
import { SidebarMenuItemProps, SidebarMenuLinkItem } from "./menu-link-item";
import { getUser } from "@/lib/auth-session";
import { UserMenu } from "./user-menu";

const appItems: SidebarMenuItemProps[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: "House",
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: "FolderCode",
  },
];
const helpItems: SidebarMenuItemProps[] = [
  {
    title: "Documentation",
    url: "/dashboard/docs",
    icon: "BookOpenText",
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: "MessageCircleQuestion",
  },
];

export const DashboardSidebar = async () => {
  const user = await getUser();
  return (
    <Sidebar>
      <DashboardSidebarHeader />
      <SidebarSeparator className="!w-11/12" />
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appItems.map((item) => (
                <SidebarMenuLinkItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpItems.map((helpItem) => (
                <SidebarMenuLinkItem key={helpItem.title} {...helpItem} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <SidebarMenuButton tooltip={"user"} asChild>
          {user && <UserMenu user={user} />}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
