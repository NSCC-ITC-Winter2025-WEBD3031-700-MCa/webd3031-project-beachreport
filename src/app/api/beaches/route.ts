// src/app/api/beaches/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const beaches = await prisma.beach.findMany({
      select: {
        slug: true,
        name: true,
        id: true,
        location: true,
        // Include any other fields you need
      },
    });
    return NextResponse.json(beaches);
  } catch (error) {
    console.error("Error fetching beaches:", error);
    return NextResponse.json(
      { error: "Failed to load beaches" },
      { status: 500 }
    );
  }
}


