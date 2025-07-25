import React from "react";
import { formatDuration } from "../projects/project-card";
import { getUserId } from "@/lib/auth-session";
import { getWeeklyProgress } from "@/lib/queries/dashboard/dev-sessions/get-weekly-progress";
import { UpdateWeeklyGoal } from "./update-weekly-goal";

export const WeeklyGoal = async () => {
  const userId = await getUserId();
  const { weeklyTotal, weeklyGoalSeconds, weeklyProgress } =
    await getWeeklyProgress(userId);

  const formattedTotal = formatDuration(weeklyTotal);
  const formattedGoal = formatDuration(weeklyGoalSeconds);

  return (
    <div className="relative  max-w-md sm:max-w-lg sm:flex sm:items-center ">
      <div className="flex flex-col gap-2 flex-1  sm:gap-4">
        <div className="flex gap-2">
          <p className="text-sm whitespace-nowrap">
            Weekly goal: {formattedTotal} / {formattedGoal}
          </p>
          <UpdateWeeklyGoal />
        </div>

        <div className="w-[250px] h-2 rounded bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
