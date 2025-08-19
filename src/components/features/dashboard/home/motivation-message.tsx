import { getUserId } from "@/lib/auth-session";
import { formatDuration } from "../projects/project-card";
import { getDaylyDevSession } from "@/lib/queries/dashboard/dev-sessions/get-dayly-dev-session";
export type MotivationMessageProps = {
  dict: {
    noCoding: string;
    shortSession1: string;
    shortSession2: string;
    productiveSession1: string;
    productiveSession2: string;
    longSession1: string;
    longSession2: string;
  };
};

export const MotivationMessage = async ({ dict }: MotivationMessageProps) => {
  const userId = await getUserId();
  const todayDevSessions = await getDaylyDevSession(userId);

  const totalSeconds = todayDevSessions.reduce(
    (acc, session) => acc + (session.duration ?? 0),
    0
  );

  const formatted = formatDuration(totalSeconds);

  let message = dict.noCoding;

  if (totalSeconds > 0 && totalSeconds < 1800) {
    message = dict.shortSession1 + formatted + dict.shortSession2;
  } else if (totalSeconds >= 1800 && totalSeconds < 7200) {
    message = dict.productiveSession1 + formatted + dict.productiveSession2;
  } else if (totalSeconds >= 7200) {
    message = dict.longSession1 + formatted + dict.longSession2;
  }

  return (
    <p className="text-justify sm:text-start max-w-md break-words">{message}</p>
  );
};
