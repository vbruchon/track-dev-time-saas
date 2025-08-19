import { HighlightsSection } from "@/components/features/dashboard/admin/highlights-section";
import { SubscriptionSection } from "@/components/features/dashboard/admin/subscription-section";
import { TopUsers } from "@/components/features/dashboard/admin/top-users";
import { getRequiredAdminUser } from "@/lib/auth-session";

export default async function DashboardAdminPage() {
  await getRequiredAdminUser();

  return (
    <div className="">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to your admin dashboard </h1>
        <p className="text-sm text-muted-foreground"></p>
      </header>

      <HighlightsSection />
      <TopUsers />
      <SubscriptionSection />
    </div>
  );
}
