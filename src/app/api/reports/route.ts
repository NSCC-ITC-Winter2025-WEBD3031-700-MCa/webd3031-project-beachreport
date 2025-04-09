import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../../../utils/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Get the session from the request
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract the authenticated user ID from the session
    const userId = session.user.id;

    const { slug, reportText, rating } = await req.json();

    // Find the beach ID using the slug
    const beach = await prisma.beach.findUnique({ where: { slug } });
    if (!beach) {
      return NextResponse.json({ error: "Beach not found" }, { status: 404 });
    }

    const report = await prisma.report.create({
      data: {
        beachId: beach.id,
        userId, // Use the actual user id from the session
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

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      include: { 
        beach: true, 
        user: true
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
