import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoPropsType = {
  footer?: boolean;
};
export const Logo = ({ footer = false }: LogoPropsType) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-bold text-primary flex items-center",
        !footer && "absolute left-8"
      )}
    >
      <Image src={"/logo.png"} width={60} height={60} alt="logo" />
      track-dev-time
    </Link>
  );
};
