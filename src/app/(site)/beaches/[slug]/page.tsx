import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const prisma = new PrismaClient();

interface BeachPageProps {
  params: Promise<{ slug: string }>;
}

async function getBeachBySlug(slug: string) {
  return await prisma.beach.findUnique({
    where: { slug },
    include: {
      reports: {
        include: {
          user: true,
        },
      },
    },
  });
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isPaidSubscriber: true },
  });
}

export default async function BeachPage({ params }: BeachPageProps) {
  const { slug } = await params;
  const beach = await getBeachBySlug(slug);
  const user = await getCurrentUser();

  if (!beach) {
    return <p className="text-center text-red-500">Beach not found.</p>;
  }

  return (
    <div className="bg-gray-200 max-w-4xl mx-auto my-20 p-6">
      <Image
        src={beach.imageUrl!}
        alt={beach.name}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold text-cyan-500 mt-6">{beach.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{beach.location}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{beach.description}</p>

      {/* Show Reports ONLY if user is a paid subscriber */}
      {user?.isPaidSubscriber ? (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">User Reports</h2>
          {beach.reports.length > 0 ? (
            beach.reports.map((report) => (
              <div key={report.id} className="bg-gray-100 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    {report.user?.name || "Anonymous"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600 mt-1">{report.reportText}</p>
                <p className="text-amber-700 mt-2">Rating: {report.rating}/5</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reports yet.</p>
          )}
        </div>
      ) : (
        <p className="mt-8 text-red-500 font-semibold">
          You must be a paid subscriber to view reports.
        </p>
      )}

      {/* Submit Report Button (Only for Paid Users) */}
      {user?.isPaidSubscriber && (
        <div className="mt-8">
          <Link href={`/beaches/${beach.slug}/report`}>
            <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
              Submit a Report
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

