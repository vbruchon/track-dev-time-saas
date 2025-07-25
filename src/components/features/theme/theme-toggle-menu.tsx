"use client";

import { Laptop, Moon, Sun, SunMoon } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const ThemeToggleMenu = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center gap-2 w-full">
        <SunMoon className="mr-2 size-5 hover:text-muted-foreground" />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-50 ml-2">
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 size-5 hover:text-muted-foreground" />
          Darkmode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 size-5 hover:text-muted-foreground" />
          Lightmode
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 size-5 hover:text-muted-foreground" />
          Systeme
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
