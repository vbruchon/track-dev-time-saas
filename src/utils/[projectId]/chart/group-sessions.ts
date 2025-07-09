import { DevSession } from "@/generated";
import { format, getWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { PartialSession } from "./session-analytics";

export const groupSessions = (devSessions: PartialSession[]) => {
  const getSessionDurationInHours = (session: DevSession) => {
    if (!session.startedAt || !session.endedAt) return 0;
    const ms =
      new Date(session.endedAt).getTime() -
      new Date(session.startedAt).getTime();
    return +(ms / 3600000).toFixed(2);
  };

  const groupByDay = (sessions: DevSession[]) => {
    const map = new Map<string, number>();

    sessions.forEach((s) => {
      const date = new Date(s.startedAt);
      const key = format(date, "yyyy-MM-dd");
      const duration = getSessionDurationInHours(s);
      map.set(key, (map.get(key) || 0) + duration);
    });

    return Array.from(map.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, duration]) => ({
        date: format(new Date(date), "dd/MM/yyyy", { locale: fr }),
        duration,
      }));
  };

  const groupByWeek = (sessions: DevSession[]) => {
    const map = new Map<string, number>();

    sessions.forEach((s) => {
      const date = new Date(s.startedAt);
      const year = date.getFullYear();
      const week = getWeek(date, { locale: fr });
      const key = `${year}-W${week}`;
      const duration = getSessionDurationInHours(s);
      map.set(key, (map.get(key) || 0) + duration);
    });

    return Array.from(map.entries())
      .sort((a, b) => {
        const [yearA, weekA] = a[0].split("-W").map(Number);
        const [yearB, weekB] = b[0].split("-W").map(Number);
        return yearA === yearB ? weekA - weekB : yearA - yearB;
      })
      .map(([key, duration]) => ({
        date: `Semaine ${key.split("-W")[1]} (${key.split("-W")[0]})`,
        duration,
      }));
  };

  const groupByMonth = (sessions: DevSession[]) => {
    const map = new Map<string, number>();

    sessions.forEach((s) => {
      const date = new Date(s.startedAt);
      const key = format(date, "yyyy-MM", { locale: fr });
      const duration = getSessionDurationInHours(s);
      map.set(key, (map.get(key) || 0) + duration);
    });

    return Array.from(map.entries())
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([key, duration]) => ({
        date: format(new Date(key + "-01"), "LLLL yyyy", { locale: fr }),
        duration,
      }));
  };

  return {
    day: groupByDay(devSessions),
    week: groupByWeek(devSessions),
    month: groupByMonth(devSessions),
  };
};
