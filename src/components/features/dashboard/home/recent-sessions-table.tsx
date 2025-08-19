"use client";
import { DataTable } from "../data-table";
import {
  getRecentSessionsColumns,
  RecentSessionWithProject,
} from "./recent-sessions-columns";
import { SessionsOverviewDict } from "./sessions-overview";

export const RecentSessionsTable = ({
  sessions,
  dict,
  dictPause,
}: {
  sessions: RecentSessionWithProject[];
  dict: SessionsOverviewDict["recentSessions"];
  dictPause: SessionsOverviewDict["pauses"];
}) => (
  <DataTable
    columns={getRecentSessionsColumns({ dict: dict.table, dictPause })}
    data={sessions}
    showPagination={false}
    element="sessions"
  />
);
