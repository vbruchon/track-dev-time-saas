import { NextResponse, type NextRequest } from "next/server";
import { sessionSchema, SessionSchemaType } from "./schema";
import { calculateDuration } from "./utils";
import { createDevSession } from "./service";
import { getUserFromRequest } from "@/lib/auth-session";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parse = sessionSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parse.error.format() },
      { status: 400 }
    );
  }

  const data: SessionSchemaType = parse.data;

  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized – Invalid or missing API key" },
      { status: 401 }
    );
  }

  const expectedDuration = calculateDuration(data);

  if (Math.abs(expectedDuration - data.duration) > 1) {
    return NextResponse.json(
      { error: "Duration does not match start/end timestamps" },
      { status: 400 }
    );
  }

  try {
    await createDevSession({ data, userId: user.id });
    return NextResponse.json({ message: "Session created" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
