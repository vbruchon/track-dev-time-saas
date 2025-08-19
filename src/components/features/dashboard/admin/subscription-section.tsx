import { StatCard } from "../stat-card";
import { SubscriptionsChart } from "./subscription-chart";
import { getSubscriptionsDistribution } from "@/lib/queries/dashboard/admin/get-subscription-distribution";
import { SubscriptionsDistributionChart } from "./chart/subscription-distribution-chart";
import { getSubscriptionsStats } from "@/lib/queries/dashboard/admin/get-subscription-stats";
import { getSubscriptionsChartData } from "@/lib/queries/dashboard/admin/get-subscriptions-chart-data";

export const SubscriptionSection = async () => {
  const {
    monthlySubscriptions,
    yearlySubscriptions,
    totalRevenue,
    monthRevenue,
    yearRevenue,
  } = await getSubscriptionsStats();

  const chartData = await getSubscriptionsChartData();
  const subsDistribution = await getSubscriptionsDistribution();

  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold mb-4">Revenue / Subscriptions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
        <StatCard title="Monthly Subs" value={`${monthlySubscriptions} subs`} />
        <StatCard title="Yearly Subs" value={`${yearlySubscriptions} subs`} />
        <StatCard title="Revenue This Month" value={`${monthRevenue} €`} />
        <StatCard title="Revenue This Year" value={`${yearRevenue} €`} />
        <StatCard title="Total Revenue" value={`${totalRevenue} €`} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <SubscriptionsDistributionChart data={subsDistribution} />
        <SubscriptionsChart data={chartData} />
      </div>
    </section>
  );
};
