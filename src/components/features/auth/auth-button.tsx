import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "better-auth";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AuthButtonProps = {
  user: User;
  className?: string;
};

export const AuthButton = ({ user, className }: AuthButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className={className}>
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={user?.image ?? ""} alt="User avatar" />
              <AvatarFallback>{user?.name[0] ?? user?.email[0]}</AvatarFallback>
            </Avatar>
            {user.name ?? user.email}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="hover:text-muted-foreground" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="w-full">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
