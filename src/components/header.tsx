import { getUser } from "@/lib/auth-session";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AuthButton } from "./features/auth/auth-button";
import { NavMenu } from "./nav-menu";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";
import { ThemeToggleButton } from "./features/theme/theme-toggle-button";
import { LangSwitcher } from "./features/lang/lang-swticher";
import { getDictionary } from "@/locales/dictionaries";

type HeaderDict = {
  header: {
    nav: string[];
  };
};

export const Header = async ({ lang }: { lang: string }) => {
  const dict = (await getDictionary(lang, "layout")) as HeaderDict;
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-6 flex items-center">
      <div className="flex-none mr-8">
        <Logo />
      </div>

      {/* Menu principal */}
      <nav className="hidden md:flex flex-1 justify-center">
        <NavMenu items={dict.header.nav} />
      </nav>

      {/* Boutons utilisateur et thème */}
      <div className="hidden md:flex flex-none items-center gap-4 ml-8">
        {user ? (
          <AuthButton user={user} lang={lang} />
        ) : (
          <Link
            className={`${buttonVariants({ size: "sm", variant: "outline" })}`}
            href="/sign-in"
          >
            Sign In
          </Link>
        )}

        <ThemeToggleButton />
        <LangSwitcher />
      </div>

      {/* Menu mobile */}
      <div className="flex flex-1 justify-end md:hidden">
        <MobileMenu user={user} lang={lang} />
      </div>
    </header>
  );
};
