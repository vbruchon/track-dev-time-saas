import "tsconfig-paths/register";

import { PrismaClient } from "@/generated";

const prisma = new PrismaClient();
const USER_ID = process.env.SEED_USER_ID;

if (!USER_ID) {
  throw new Error("USER_ID not set in .env");
}

const possibleCategories = ["urgent", "side-project", "client", "indie"];

// Règles exclusives : "side-project" et "client" ne peuvent pas coexister
const incompatibleCategories: [string, string][] = [["side-project", "client"]];

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

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function areCategoriesCompatible(cats: string[]) {
  for (const [a, b] of incompatibleCategories) {
    if (cats.includes(a) && cats.includes(b)) {
      return false;
    }
  }
  return true;
}

function generateCategories() {
  let cats: string[] = [];

  const count = randomInt(1, 2);

  while (cats.length < count) {
    const candidate =
      possibleCategories[randomInt(0, possibleCategories.length - 1)];
    if (!cats.includes(candidate)) {
      const trial = [...cats, candidate];
      if (areCategoriesCompatible(trial)) {
        cats = trial;
      }
    }
  }

  return cats;
}

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

async function main() {
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

  const projects = await prisma.project.findMany({
    where: { userId: USER_ID },
    include: {
      categories: true,
      technologies: true,
    },
  });

  for (const project of projects) {
    const cats = generateCategories();
    const techs = sampleArray(availableTechnologies, 1, 5);

    const connectCategories = cats.map((name) => ({
      id: categoriesMap.get(name)!.id,
    }));
    const connectTechnologies = techs.map((name) => ({
      id: techMap.get(name)!.id,
    }));

    await prisma.project.update({
      where: { id: project.id },
      data: {
        categories: {
          set: [],
          connect: connectCategories.map((cat) => ({ id: cat.id })),
        },
        technologies: {
          set: [],
          connect: connectTechnologies,
        },
      },
    });

    console.log(
      `Updated project ${project.name} with categories [${cats.join(", ")}] and techs [${techs.join(", ")}]`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
