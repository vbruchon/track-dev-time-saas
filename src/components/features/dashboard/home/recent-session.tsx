import { RecentSessionWithProject } from "./recent-sessions-columns";
import { getRecentDevSession } from "@/lib/queries/dashboard/dev-sessions/get-recent-dev-session";
import { RecentSessionsTable } from "./recent-sessions-table";
import { SessionsOverviewDict } from "./sessions-overview";

export const RecentSession = async ({
  userId,
  dict,
  dictPause,
}: {
  userId: string;
  dict: SessionsOverviewDict["recentSessions"];
  dictPause: SessionsOverviewDict["pauses"];
}) => {
  const recentSessions: RecentSessionWithProject[] =
    await getRecentDevSession(userId);

  return (
    <div className="px-4">
      <h3 className="text-lg my-4">{dict.title}</h3>
      <RecentSessionsTable
        sessions={recentSessions}
        dict={dict}
        dictPause={dictPause}
      />
    </div>
  );
};
