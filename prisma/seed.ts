import "tsconfig-paths/register";
import { Categories, PrismaClient } from "@/generated";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const USER_ID = process.env.SEED_USER_ID;

const possibleCategories = [
  "urgent",
  "side_project",
  "client",
  "indie",
] as const;
const availableTechnologies = [
  "Node.js",
  "Express",
  "TypeScript",
  "NestJS",
  "Prisma",
  "Jest",
  "React",
  "Next.js",
  "GraphQL",
  "Docker",
];

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function sampleArray<T>(arr: T[], min: number, max: number): T[] {
  const count = randomInt(min, max);
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    if (copy.length === 0) break;
    const idx = randomInt(0, copy.length - 1);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return result;
}

function getRandomProjectStartDate(): Date {
  const start = new Date("2025-01-01T00:00:00.000Z").getTime();
  const end = new Date("2025-06-30T23:59:59.999Z").getTime();
  return new Date(randomInt(start, end));
}

async function main() {
  console.log("✅ Seeder lancé");
  if (!USER_ID) {
    console.error(
      "❌ La variable d'environnement SEED_USER_ID n'est pas définie !"
    );
    process.exit(1);
  }

  const categoriesInDb = await prisma.category.findMany();
  const categoriesMap = new Map(categoriesInDb.map((c) => [c.name, c]));

  for (const catName of possibleCategories) {
    if (!categoriesMap.has(catName)) {
      const newCat = await prisma.category.create({ data: { name: catName } });
      categoriesMap.set(catName, newCat);
    }
  }

  const techInDb = await prisma.technology.findMany();
  const techMap = new Map(techInDb.map((t) => [t.name, t]));

  for (const techName of availableTechnologies) {
    if (!techMap.has(techName)) {
      const newTech = await prisma.technology.create({
        data: { name: techName },
      });
      techMap.set(techName, newTech);
    }
  }

  let totalSessions = 0;
  let totalPauses = 0;

  for (let i = 0; i < 10; i++) {
    const createdAt = getRandomProjectStartDate();
    const updatedAt = new Date(createdAt.getTime() + 45 * 24 * 60 * 60 * 1000); // +45 jours

    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        userId: USER_ID,
        createdAt,
        updatedAt,
      },
    });

    // const cats = generateCategories();
    const techs = sampleArray(availableTechnologies, 1, 5);

    const allCategories: Categories[] = [
      Categories.client,
      Categories.indie,
      Categories.side_project,
      Categories.urgent,
    ];

    const cats: Categories[] = faker.helpers.arrayElements(allCategories, {
      min: 1,
      max: 2,
    });

    await prisma.project.update({
      where: { id: project.id },
      data: {
        categories: {
          set: [],
          connect: cats.map((name) => ({ id: categoriesMap.get(name)!.id })),
        },
        technologies: {
          set: [],
          connect: techs.map((name) => ({ id: techMap.get(name)!.id })),
        },
      },
    });

    const sessionCount = randomInt(2, 15);
    totalSessions += sessionCount;

    for (let j = 0; j < sessionCount; j++) {
      const duration = randomInt(2 * 3600, 9 * 3600); // en secondes
      const dayOffset = randomInt(0, 44);
      const sessionDate = new Date(
        createdAt.getTime() + dayOffset * 24 * 60 * 60 * 1000
      );
      sessionDate.setHours(randomInt(0, 23), randomInt(0, 59), 0, 0);

      const startedAt = new Date(sessionDate);
      const endedAt = new Date(startedAt.getTime() + duration * 1000);

      const session = await prisma.devSession.create({
        data: {
          startedAt,
          endedAt,
          duration,
          projectId: project.id,
        },
      });

      const pauseCount = randomInt(0, 5);
      totalPauses += pauseCount;

      let remainingTime = duration - 300;

      for (let k = 0; k < pauseCount && remainingTime > 60; k++) {
        const pauseDuration = randomInt(60, Math.min(remainingTime, 900));
        const offsetFromStart = randomInt(60, duration - pauseDuration - 60);
        const pauseStart = new Date(
          startedAt.getTime() + offsetFromStart * 1000
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

  console.log(`✅ Seed terminé avec succès.`);
  console.log(`📦 10 projets créés`);
  console.log(`🧑‍💻 ${totalSessions} DevSessions`);
  console.log(`⏸️ ${totalPauses} Pauses`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur dans le seed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
