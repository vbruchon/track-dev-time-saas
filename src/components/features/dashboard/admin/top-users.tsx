import { prisma } from "@/lib/prisma";
import React from "react";
import { StatCard } from "../stat-card";

export const TopUsers = async () => {
  const topUsers = await prisma.user.findMany({
    take: 6,
    orderBy: {
      sessions: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          sessions: true,
          projects: true,
        },
      },
    },
  });
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold mb-4">Top Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topUsers.map((user) => (
          <StatCard
            key={user.name}
            title={user.name ?? user.email}
            value={`${user._count?.projects ?? 0} projects | ${user._count?.sessions ?? 0} sessions`}
          />
        ))}
      </div>
    </section>
  );
};
