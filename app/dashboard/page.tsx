import { Hello } from "@/components/features/dashboard/home/hello";
import { ProductivityOverview } from "@/components/features/dashboard/home/productivity-overview";
import { ProjectOverview } from "@/components/features/dashboard/home/project-overview";
import { SessionsOverview } from "@/components/features/dashboard/home/sessions-overview";
import { getRequiredUser } from "@/lib/auth-session";

export default async function DashboardPage() {
  const user = await getRequiredUser();

  return (
    <>
      <Hello name={user.name ?? user.email} />
      <ProductivityOverview />
      <SessionsOverview />
      <ProjectOverview />
    </>
  );
}
