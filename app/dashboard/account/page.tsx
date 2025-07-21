import { AccountForm } from "@/components/features/dashboard/account/account-form";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const user = await getRequiredUser();
  const userWithMyElement = await prisma.user.findFirstOrThrow({
    where: {
      id: user.id,
    },
  });
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
      <Card>
        <CardContent>
          <AccountForm user={userWithMyElement} />
        </CardContent>
      </Card>
    </div>
  );
}
