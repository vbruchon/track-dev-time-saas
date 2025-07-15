import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const weeklyGoalSchema = z.object({
  weeklyGoalSeconds: z.number(),
});

export type WeeklyGoalSchemaType = z.infer<typeof weeklyGoalSchema>;

export async function POST(request: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parse = weeklyGoalSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parse.error.format() },
      { status: 400 }
    );
  }
  const { weeklyGoalSeconds }: WeeklyGoalSchemaType = body;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { weeklyGoalSeconds },
    });
    return NextResponse.json({ message: "Weekly goal updated" });
  } catch {
    return NextResponse.json(
      { error: "Failed to update weekly goal" },
      { status: 500 }
    );
  }
}
