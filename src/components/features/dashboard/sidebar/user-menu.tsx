"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserIcon, ChevronsUpDown } from "lucide-react";
import { LogoutButton } from "@/components/features/auth/logout-button";

import { User } from "better-auth";
import { UserAvatar } from "./user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggleMenu } from "@/components/features/theme/theme-toggle-menu";

export function UserMenu({ user }: { user: User | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center w-full p-2 rounded-xl hover:bg-muted ">
        <UserAvatar user={user} />
        <ChevronsUpDown className="ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="min-w-50">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={user?.image ?? ""}
              alt="User avatar"
              className="size-10 rounded-xl"
            />
            <AvatarFallback>
              {user?.name?.[0] ?? user?.email?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-0.5">
            <span>{user?.name}</span>
            <span>{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 size-5 hover:text-muted-foreground" />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ThemeToggleMenu />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
