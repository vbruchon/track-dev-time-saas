"use client";

import { ChevronRight, Laptop, Moon, Sun, SunMoon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const ThemeToggleMenu = () => {
  const { theme, setTheme } = useTheme();
  console.log({ theme });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 w-full">
        <SunMoon className="mr-2 size-5 hover:text-muted-foreground" />
        Theme
        <ChevronRight className="ml-auto hover:text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="min-w-50 ml-2">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
