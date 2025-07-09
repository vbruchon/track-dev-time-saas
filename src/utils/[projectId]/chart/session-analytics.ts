import { DevSession } from "@/generated";

export type PartialSession = Omit<DevSession, "userId"> & {
  startedAt: Date;
};

export type PeriodKey = "morning" | "afternoon" | "evening" | "night";

export const getDominantPeriod = (
  periods: Record<PeriodKey, number>
): PeriodKey => {
  let dominant: PeriodKey = "morning";
  let max = -Infinity;

  for (const period in periods) {
    const key = period as PeriodKey;
    if (periods[key] > max) {
      max = periods[key];
      dominant = key;
    }
  }

  return dominant;
};

export const countTimePerPeriod = (sessions: PartialSession[]) => {
  const periods: Record<PeriodKey, number> = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  };

  sessions.forEach((session) => {
    const validatePeriods = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      night: 0,
    };
    const start = new Date(session.startedAt);
    const end = new Date(session.endedAt!);

    for (
      let current = new Date(start);
      current < end;
      current.setHours(current.getHours() + 1)
    ) {
      const hour = current.getHours();

      if (hour > 6 && hour < 12) {
        validatePeriods.morning++;
      } else if (hour > 12 && hour < 18) {
        validatePeriods.afternoon++;
      } else if (hour > 18 && hour < 24) {
        validatePeriods.evening++;
      } else {
        validatePeriods.night++;
      }
    }

    const dominantPeriod = getDominantPeriod(validatePeriods);

    periods[dominantPeriod]++;
  });

  return [
    { name: "Morning", value: periods.morning },
    { name: "Afternoon", value: periods.afternoon },
    { name: "Evening", value: periods.evening },
    { name: "Night", value: periods.night },
  ];
};

type SessionsPerWeekday = Record<string, number>;

export const countSessionsPerWeekday = (
  sessions: PartialSession[]
): SessionsPerWeekday => {
  const counts: SessionsPerWeekday = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  sessions.forEach((session) => {
    const date = new Date(session.startedAt);
    const day = date.getDay(); // 0 (Sun) - 6 (Sat)

    const dayNames = Object.keys(counts);
    const dayName = dayNames[day];

    counts[dayName]++;
  });

  return counts;
};
