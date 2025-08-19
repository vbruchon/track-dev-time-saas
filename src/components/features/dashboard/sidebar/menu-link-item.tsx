"use client";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type LucideIconName = keyof typeof Icons.icons;

export type SidebarMenuItemProps = {
  title: string;
  url: string;
  icon: LucideIconName;
};

import * as Icons from "lucide-react";

export function SidebarMenuLinkItem({
  icon,
  title,
  url,
}: SidebarMenuItemProps) {
  const LucideIcon = Icons.icons[icon as keyof typeof Icons.icons];
  const pathname = usePathname();
  console.log(Object.keys(Icons)); // liste toutes les icônes disponibles

  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={title} isActive={pathname === url} asChild>
        <Link href={url}>
          <LucideIcon className="size-5" />
          <span className="ml-2">{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
