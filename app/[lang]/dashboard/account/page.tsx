import { AccountForm } from "@/components/features/dashboard/account/account-form";
import { SubscriptionInfo } from "@/components/features/dashboard/account/subscribtion-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredUser } from "@/lib/auth-session";
import { getUserSubscription } from "@/lib/queries/dashboard/subscription/get-user-subscription";
import { getDictionary } from "@/locales/dictionaries";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "dashboard/account");
  const user = await getRequiredUser();
  const userSubscription = await getUserSubscription(user.id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {dict.account.title}
      </h1>
      <Card>
        <CardContent>
          <AccountForm user={user} dict={dict.account.accountForm} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.subscription.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscriptionInfo
            dict={dict.subscription.subscriptionInfo}
            subscription={userSubscription}
            lang={lang}
          />
        </CardContent>
      </Card>
    </div>
  );
}
