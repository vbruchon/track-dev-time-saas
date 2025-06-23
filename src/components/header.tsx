import { getUser } from "@/lib/auth-session";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { AuthButton } from "./features/auth/auth-button";

export const Header = async () => {
  const user = await getUser();

  return (
    <header className="px-4 py-2 border-b flex items-center justify-between gap-2">
      <Link
        href="/"
        className="text-xl font-bold text-primary flex items-center "
      >
        <Image src={"/logo.png"} width={60} height={60} alt="logo" />
        track-dev-time
      </Link>
      {user ? (
        <AuthButton user={user} />
      ) : (
        <Link
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href="/sign-in"
        >
          SignIn
        </Link>
      )}
    </header>
  );
};
