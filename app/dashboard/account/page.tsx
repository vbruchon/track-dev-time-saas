import { AccountForm } from "@/components/features/dashboard/account/account-form";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getUserSubscription } from "@/lib/queries/dashboard/subscription/get-user-subscription";

export default async function AccountPage() {
  const user = await getRequiredUser();
  const userSubscription = await getUserSubscription(user.id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
      <Card>
        <CardContent>
          <AccountForm user={user} subscription={userSubscription} />
        </CardContent>
      </Card>
    </div>
  );
}
