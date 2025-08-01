import { cn } from "@/lib/utils";

export type NavMenuItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const NavMenuItem = ({
  href,
  label,
  isActive = false,
  onClick,
}: NavMenuItemProps) => {
  return (
    <li className="relative flex flex-col items-center">
      <a
        href={href}
        onClick={onClick}
        className={cn(
          " font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        {label}
      </a>

      <div className="relative mt-1 h-[3px] w-full overflow-hidden">
        {isActive && (
          <span className="absolute left-1/2 top-0 h-full w-full max-w-[100px] -translate-x-1/2 bg-primary" />
        )}
      </div>
    </li>
  );
};
