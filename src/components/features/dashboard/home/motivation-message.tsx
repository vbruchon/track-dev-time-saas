import { getUserId } from "@/lib/auth-session";
import { formatDuration } from "../projects/project-card";
import { getDaylyDevSession } from "@/lib/queries/dashboard/dev-sessions/get-dayly-dev-session";

export const MotivationMessage = async () => {
  const userId = await getUserId();
  const todayDevSessions = await getDaylyDevSession(userId);

  const totalSeconds = todayDevSessions.reduce(
    (acc, session) => acc + (session.duration ?? 0),
    0
  );

  const formatted = formatDuration(totalSeconds);

  let message = "You haven't coded yet today. Time to dive in! 💪";

  if (totalSeconds > 0 && totalSeconds < 1800) {
    message = `A quick ${formatted} coding session today. Nice warm-up! 👌`;
  } else if (totalSeconds >= 1800 && totalSeconds < 7200) {
    message = `You’ve been productive with ${formatted} of coding today. 🔥 Keep it up!`;
  } else if (totalSeconds >= 7200) {
    message = `Impressive! You’ve coded for ${formatted} today. Absolute beast. 🚀`;
  }

  return (
    <p className="text-muted- text-justify sm:text-start whitespace-nowrap">
      {message}
    </p>
  );
};
