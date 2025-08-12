import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className={cn("text-xl font-bold text-primary flex items-center")}
    >
      <Image src={"/logo.png"} width={60} height={60} alt="logo" />
      track-dev-time
    </Link>
  );
};
