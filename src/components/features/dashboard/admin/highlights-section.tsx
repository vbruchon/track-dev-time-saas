import React from "react";
import { StatCard } from "../stat-card";
import { ChartCard } from "../chart/chart-card";
import { UsersRegistrationChart } from "./chart/users-registar";
import { getHighlightsStats } from "@/lib/queries/dashboard/admin/get-highlights-stats";

export const HighlightsSection = async () => {
  const {
    totalUsers,
    trialUsers,
    subscribedUsers,
    nonSubscribedUsers,
    chartData,
  } = await getHighlightsStats();

  const percent = (count: number) => ((count / totalUsers) * 100).toFixed(1);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard
          title="Users in Trial"
          value={`${trialUsers.length} (${percent(trialUsers.length)}%)`}
        />
        <StatCard
          title="Subscribed Users"
          value={`${subscribedUsers} (${percent(subscribedUsers)}%)`}
        />
        <StatCard
          title="Non-Subscribed Users"
          value={`${nonSubscribedUsers} (${percent(nonSubscribedUsers)}%)`}
        />
      </section>
      <ChartCard title="User Registration">
        <UsersRegistrationChart data={chartData} />
      </ChartCard>
    </>
  );
};
