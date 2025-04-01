import { Suspense } from 'react';
import { UsersChartSkeleton, LatestReportsSkeleton, CardsSkeleton, } from '@/app/ui/skeletons';
import LatestReports from '@/app/ui/dashboard/latest-reports';
import UsersChart from '@/app/ui/dashboard/users-chart';
import CardWrapper from '@/app/ui/dashboard/cards';
 
export default async function Page() {
    return (
      <div className="bg-gray-200 max-w-4xl mx-auto my-20 p-6">
        <h1 className="mb-4 font-bold text-center text-xl md:text-2xl">
          Admin Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
        </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<UsersChartSkeleton />}>
          <UsersChart />
        </Suspense>
        <Suspense fallback={<LatestReportsSkeleton />}>
          <LatestReports />
        </Suspense>
        </div>
      </div>
    );
}