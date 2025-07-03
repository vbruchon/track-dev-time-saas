import "tsconfig-paths/register";

import { PrismaClient } from "@/generated";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const USER_ID = process.env.SEED_USER_ID;

async function main() {
  console.log("✅ Seeder lancé");

  if (!USER_ID) {
    console.error(
      "❌ La variable d'environnement SEED_USER_ID n'est pas définie !"
    );
    process.exit(1);
  }

  for (let i = 0; i < 10; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        userId: USER_ID,
      },
    });

    const devSessionCount = faker.number.int({ min: 2, max: 15 });

    for (let j = 0; j < devSessionCount; j++) {
      const durationSeconds = faker.number.int({
        min: 2 * 3600,
        max: 9 * 3600,
      });
      const startedAt = faker.date.past({ years: 1 });
      const endedAt = new Date(startedAt.getTime() + durationSeconds * 1000);

      const session = await prisma.devSession.create({
        data: {
          startedAt,
          endedAt,
          duration: durationSeconds,
          projectId: project.id,
        },
      });

      const pauseCount = faker.number.int({ min: 0, max: 5 });
      let remainingTime = durationSeconds - 300; // Laisse au moins 5 min de session hors pause

      for (let k = 0; k < pauseCount && remainingTime > 60; k++) {
        const pauseDuration = faker.number.int({
          min: 60,
          max: Math.min(remainingTime, 900),
        }); // max 15 min
        const pauseStart = new Date(
          startedAt.getTime() +
            faker.number.int({
              min: 60,
              max: durationSeconds - pauseDuration - 60,
            }) *
              1000
        );
        const pauseEnd = new Date(pauseStart.getTime() + pauseDuration * 1000);

        await prisma.pause.create({
          data: {
            startedAt: pauseStart,
            endedAt: pauseEnd,
            duration: pauseDuration,
            sessionId: session.id,
          },
        });

        remainingTime -= pauseDuration;
      }
    }
  }

  console.log("✅ Seed terminé.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur dans le seed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
