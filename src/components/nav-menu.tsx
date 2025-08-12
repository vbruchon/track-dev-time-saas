"use client";
import { useEffect, useState } from "react";
import { NavMenuItemProps, NavMenuItem } from "./nav-menu-item";
import { cn } from "@/lib/utils";

type NavMenuProps = {
  onLinkClick?: () => void;
  footer?: boolean;
};

export const NavMenu = ({ onLinkClick, footer = false }: NavMenuProps) => {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#");
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  // Items principaux
  const mainItems: NavMenuItemProps[] = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  // Items spécifiques au footer
  const footerItems: NavMenuItemProps[] = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/cgv", label: "Terms and Conditions" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  const items = footer ? footerItems : mainItems;

  return (
    <ul
      className={cn(
        "flex md:flex-row items-start md:mt-0 md:items-center gap-4",
        footer ? "flex-row flex-wrap" : "flex-col mt-12"
      )}
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <NavMenuItem
          key={item.label}
          href={item.href}
          label={item.label}
          isActive={
            item.href === "/" ? activeHash === "#" : item.href === activeHash
          }
          onClick={() => {
            if (onLinkClick) onLinkClick();
          }}
        />
      ))}
    </ul>
  );
};
