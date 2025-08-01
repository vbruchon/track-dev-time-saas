"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "./ui/button";
import { Menu, X } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";
import { AuthButton } from "./features/auth/auth-button";
import Link from "next/link";
import { User } from "better-auth";

export const MobileMenu = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerClose asChild>
            <Button
              size={"sm"}
              variant={"ghost"}
              aria-label="Close menu"
              className="ml-auto"
            >
              <X />
            </Button>
          </DrawerClose>
          <DrawerTitle>
            <Logo />
          </DrawerTitle>

          <div className="mt-12">
            <NavMenu onLinkClick={handleLinkClick} />
          </div>
        </DrawerHeader>

        <DrawerFooter className="border-t pt-4">
          {user ? (
            <AuthButton user={user} className="w-full" />
          ) : (
            <Link
              href="/sign-in"
              className={
                buttonVariants({ size: "sm", variant: "outline" }) +
                " w-full text-center"
              }
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
