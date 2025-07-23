import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(technologies, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
