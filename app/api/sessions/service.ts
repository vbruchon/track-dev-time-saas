import { prisma } from "@/lib/prisma";
import { PauseSchemaType, SessionSchemaType } from "./schema";
import { calculatePauseDuration } from "./utils";

type CreateDevSessionProps = {
  data: SessionSchemaType;
  userId: string;
};

export const createDevSession = async ({
  data,
  userId,
}: CreateDevSessionProps) => {
  const project = await getOrCreateProject(userId, data.projectName);
  const startedAt = new Date(data.start);
  const endedAt = new Date(data.end);

  const session = await prisma.devSession.upsert({
    where: {
      projectId_startedAt: {
        projectId: project.id,
        startedAt,
      },
    },
    update: {
      endedAt,
      duration: data.duration,
    },
    create: {
      projectId: project.id,
      startedAt,
      endedAt,
      duration: data.duration,
      pauses: {
        create: data.pauses.map((pause: PauseSchemaType) => ({
          startedAt: pause.start,
          endedAt: pause.end,
          duration: calculatePauseDuration(pause),
        })),
      },
    },
  });

  await syncNewPausesForSession(session.id, data.pauses);

  return session;
};

const syncNewPausesForSession = async (
  sessionId: string,
  pauses: PauseSchemaType[]
) => {
  const exisitingPauses = await prisma.pause.findMany({
    where: {
      sessionId,
    },
    select: { startedAt: true },
  });

  const existingStartSet = new Set(
    exisitingPauses.map((pause) => pause.startedAt.toISOString())
  );

  const newPauses = pauses.filter(
    (pause) => !existingStartSet.has(new Date(pause.start).toISOString())
  );

  if (newPauses.length > 0) {
    await prisma.pause.createMany({
      data: newPauses.map((pause) => ({
        sessionId,
        startedAt: new Date(pause.start),
        endedAt: pause.end ? new Date(pause.end) : null,
        duration: calculatePauseDuration(pause),
      })),
    });
  }
};

const getOrCreateProject = async (userId: string, projectName: string) => {
  return prisma.project.upsert({
    where: {
      userId_name: {
        userId,
        name: projectName,
      },
    },
    update: {},
    create: {
      name: projectName,
      userId,
    },
  });
};
