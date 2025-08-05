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
  // Récupère les pauses déjà existantes dans la BDD pour cette session
  const exisitingPauses = await prisma.pause.findMany({
    where: {
      sessionId,
    },
    select: { startedAt: true },
  });
  // On crée un Set (structure rapide pour rechercher des valeurs)
  // Ce Set contient toutes les dates `startedAt` déjà présentes en base
  const existingStartSet = new Set(
    exisitingPauses.map((pause) => pause.startedAt.toISOString())
  );
  // Filtre la liste des pauses reçues pour garder uniquement celles qui ne sont pas en base
  const newPauses = pauses.filter(
    (pause) => !existingStartSet.has(new Date(pause.start).toISOString())
  );
  // S'il y a de nouvelles pauses à créer, on les insère en une seule requête
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
