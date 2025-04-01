import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        isPaidSubscriber: true,
      },
    });

    const regularUsers = users.filter(user => !user.isPaidSubscriber).length;
    const paidSubscribers = users.filter(user => user.isPaidSubscriber).length;

    return NextResponse.json({ users, regularUsers, paidSubscribers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
