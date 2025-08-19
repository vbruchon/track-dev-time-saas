"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export const LangSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLang = pathname.split("/")[1];
  const newLang = currentLang === "fr" ? "en" : "fr";

  const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);

  const onChangeLang = () => {
    router.push(newPath);
  };

  return (
    <Button variant={"outline"} size={"icon"} onClick={onChangeLang}>
      {newLang.toUpperCase()}
    </Button>
  );
};
