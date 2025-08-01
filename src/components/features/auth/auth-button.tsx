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

type AuthButtonProps = {
  user: User;
  className?: string;
};

export const AuthButton = ({ user, className }: AuthButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant={"outline"} className={className}>
          {user.name ?? user.email}
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
