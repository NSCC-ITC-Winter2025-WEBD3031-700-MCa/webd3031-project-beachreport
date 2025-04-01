import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalReports = await prisma.report.count();
    const totalBeaches = await prisma.beach.count();
    const totalSubscriptions = await prisma.user.count({
      where: { isPaidSubscriber: true },
    });

    return NextResponse.json({
      numberOfUsers: totalUsers,
      numberOfReports: totalReports,
      numberOfBeaches: totalBeaches,
      numberOfSubscriptions: totalSubscriptions,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
