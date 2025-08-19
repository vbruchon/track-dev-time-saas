import { getDictionary } from "@/locales/dictionaries";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const Footer = async ({ lang }: { lang: string }) => {
  const dict = await getDictionary(lang, "layout");

  return (
    <footer className="border-t w-full px-6 py-12 text-sm text-muted-foreground">
      <div className="max-w-6xl flex flex-col items-center md:flex-row md:justify-between md:items-center mx-auto gap-8">
        <Logo />
        <NavMenu items={dict.footer.nav} footer={true} />
      </div>

      <div className="mt-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} track-dev-time. {dict.footer.copyright}
      </div>
    </footer>
  );
};
