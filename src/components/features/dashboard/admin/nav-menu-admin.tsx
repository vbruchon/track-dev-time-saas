import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  SidebarMenuItemProps,
  SidebarMenuLinkItem,
} from "../sidebar/menu-link-item";

export const NavMenuAdmin = () => {
  const items: SidebarMenuItemProps[] = [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: "Shield",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuLinkItem key={item.title} {...item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
