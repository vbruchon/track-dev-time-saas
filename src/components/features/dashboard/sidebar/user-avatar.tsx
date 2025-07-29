import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

import { User } from "better-auth";

export const UserAvatar = ({ user }: { user: User }) => {
  const { state } = useSidebar();
  if (state === "expanded") {
    return (
      <>
        <Avatar>
          <AvatarImage
            src={user?.image ?? ""}
            alt="User avatar"
            className="size-10 rounded-xl"
          />
          <AvatarFallback>{user?.name[0] ?? user?.email[0]}</AvatarFallback>
        </Avatar>
        <span className="ml-2">{user?.name ?? user?.email}</span>
      </>
    );
  }

  return null;
};
