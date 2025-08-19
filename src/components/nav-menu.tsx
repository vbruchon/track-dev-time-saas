"use client";

import { useEffect, useState } from "react";
import { NavMenuItemProps, NavMenuItem } from "./nav-menu-item";
import { cn } from "@/lib/utils";

type NavMenuProps = {
  items?: string[];
  onLinkClick?: () => void;
  footer?: boolean;
};

export const NavMenu = ({
  items = [],
  onLinkClick,
  footer = false,
}: NavMenuProps) => {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || "#");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const labelToHref = (label: string) => {
    if (footer) {
      switch (label) {
        case "Legal Notice":
        case "Mentions légales":
          return "/legal-notice";
        case "Terms and Conditions":
        case "Conditions générales":
          return "/cgv";
        case "Privacy Policy":
        case "Politique de confidentialité":
          return "/privacy-policy";
        default:
          return "#";
      }
    } else {
      // Main nav
      switch (label) {
        case "Home":
        case "Accueil":
          return "/";
        case "Features":
        case "Fonctionnalités":
          return "#features";
        case "Pricing":
        case "Prix":
          return "#pricing";
        case "FAQ":
          return "#faq";
        default:
          return "#";
      }
    }
  };

  const navItems: NavMenuItemProps[] = items.map((label) => ({
    label,
    href: labelToHref(label),
  }));

  return (
    <ul
      className={cn(
        "flex md:flex-row items-start md:mt-0 md:items-center gap-4",
        footer ? "flex-row flex-wrap" : "flex-col mt-12"
      )}
      aria-label={footer ? "Footer navigation" : "Main navigation"}
    >
      {navItems.map((item) => (
        <NavMenuItem
          key={item.label}
          href={item.href}
          label={item.label}
          isActive={
            item.href === "/" ? activeHash === "#" : item.href === activeHash
          }
          onClick={() => onLinkClick?.()}
        />
      ))}
    </ul>
  );
};
