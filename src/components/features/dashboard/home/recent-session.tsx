import { DataTable } from "../data-table";
import {
  recentSessionsColumns,
  RecentSessionWithProject,
} from "./recent-sessions-columns";
import { getRecentDevSession } from "@/lib/queries/dashboard/dev-sessions/get-recent-dev-session";

export const RecentSession = async ({ userId }: { userId: string }) => {
  const recentSessions: RecentSessionWithProject[] =
    await getRecentDevSession(userId);

  return (
    <div className="px-4">
      <h3 className="text-lg my-4">Recent Sessions</h3>
      <DataTable
        columns={recentSessionsColumns}
        data={recentSessions}
        showPagination={false}
        element="sessions"
      />
    </div>
  );
};
