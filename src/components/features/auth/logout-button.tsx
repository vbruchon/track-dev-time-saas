"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, useState } from "react";

type LogoutButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  lang: string;
};

export const LogoutButton = ({ lang, ...props }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut(
      {},
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          setIsLoading(false);
          router.push("/sign-in");
        },
      }
    );
  };

  return (
    <button {...props} onClick={handleLogout}>
      {isLoading ? (
        lang === "fr" ? (
          "Chargement..."
        ) : (
          "Loading..."
        )
      ) : (
        <>
          <LogOut className="hover:text-muted-foreground" />
          {lang === "fr" ? "Déconnexion" : "Logout"}
        </>
      )}
    </button>
  );
};
