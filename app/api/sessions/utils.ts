import { PauseSchemaType, SessionSchemaType } from "./schema";

export const calculatePauseDuration = (pause: PauseSchemaType) => {
  const start = toDate(pause.start);
  const end = toDate(pause.end);
  return pause.duration ?? Math.round((end.getTime() - start.getTime()) / 1000);
};

export const calculateDuration = (session: SessionSchemaType) => {
  const start = toDate(session.start);
  const end = toDate(session.end);
  const total = Math.round((end.getTime() - start.getTime()) / 1000);
  const totalPause = session.pauses.reduce(
    (acc, pause) => acc + calculatePauseDuration(pause),
    0
  );
  return total - totalPause;
};

const toDate = (d: string | Date) => (d instanceof Date ? d : new Date(d));
