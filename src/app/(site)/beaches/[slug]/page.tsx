import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

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

export default async function BeachPage({ params }: BeachPageProps) {
  // Await the params before using them.
  const { slug } = await params;
  const beach = await getBeachBySlug(slug);

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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Reports</h2>
        {beach.reports.map((report) => (
          <div key={report.id} className="bg-gray-100 p-4 rounded-md mb-4">
            {/* Username & Timestamp (Same Line) */}
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
        ))}
      </div>

      {/* Submit Report Button */}
      <div className="mt-8">
        <Link href={`/beaches/${beach.slug}/report`}>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
            Submit a Report
          </button>
        </Link>
      </div>
    </div>
  );
}


