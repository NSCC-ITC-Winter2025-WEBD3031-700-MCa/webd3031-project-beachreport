import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { slug, reportText, rating } = await req.json();

    // Find the beach ID using the slug
    const beach = await prisma.beach.findUnique({ where: { slug } });
    if (!beach) return NextResponse.json({ error: "Beach not found" }, { status: 404 });

    // TODO: Replace with actual user ID from authentication session
    const userId = "cm8g18ljp00018skayu0e4gs3"; // Temporary placeholder (John Doe's id number)

    const report = await prisma.report.create({
      data: {
        beachId: beach.id,
        userId,
        reportText,
        rating,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
