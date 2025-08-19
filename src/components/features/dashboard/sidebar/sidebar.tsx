// sidebar.tsx
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

type SidebarDict = {
  application: string;
  help: string;
  menuItems: {
    home: string;
    projects: string;
    documentation: string;
    support: string;
  };
  userTooltip: string;
};

type DashboardSidebarProps = {
  dict: SidebarDict;
  lang: string;
};

export const DashboardSidebar = async ({
  dict,
  lang,
}: DashboardSidebarProps) => {
  const user = await getUser();

  const appItems: SidebarMenuItemProps[] = [
    {
      title: dict.menuItems.home,
      url: "/dashboard",
      icon: "House",
    },
    {
      title: dict.menuItems.projects,
      url: "/dashboard/projects",
      icon: "FolderCode",
    },
    {
      title: dict.menuItems.documentation,
      url: "/dashboard/docs",
      icon: "BookOpenText",
    },
  ];

  const helpItems: SidebarMenuItemProps[] = [
    {
      title: dict.menuItems.support,
      url: "/dashboard/support",
      icon: "MessageCircleQuestion",
    },
  ];

  return (
    <Sidebar>
      <DashboardSidebarHeader />
      <SidebarSeparator className="!w-11/12" />
      <SidebarContent className="flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel>{dict.application}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appItems.map((item) => (
                <SidebarMenuLinkItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>{dict.help}</SidebarGroupLabel>
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
        <SidebarMenuButton tooltip={dict.userTooltip} asChild>
          {user && <UserMenu user={user} lang={lang} />}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
