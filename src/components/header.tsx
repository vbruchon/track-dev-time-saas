import { getUser } from "@/lib/auth-session";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AuthButton } from "./features/auth/auth-button";
import { NavMenu } from "./nav-menu";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";
import { ThemeToggleButton } from "./features/theme/theme-toggle-button";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-6 flex items-center">
      <Logo />

      <nav className="hidden md:flex flex-1 justify-center">
        <NavMenu />
      </nav>
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <AuthButton user={user} />
        ) : (
          <Link
            className={`${buttonVariants({ size: "sm", variant: "outline" })} absolute right-8`}
            href="/sign-in"
          >
            SignIn
          </Link>
        )}
        <ThemeToggleButton />
      </div>
      <div className="flex flex-1 justify-end md:hidden">
        <MobileMenu user={user} />
      </div>
    </header>
  );
};
