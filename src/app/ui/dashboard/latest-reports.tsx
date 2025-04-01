"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function LatestReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      const res = await fetch("/api/reports");
      const data = await res.json();
      setReports(data.reports?.slice(0, 4) || []); // Limit to 6 most recent
      setLoading(false);
    }
    fetchReports();
  }, []);

  if (loading) {
    return <p>Loading latest reports...</p>;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-center text-xl md:text-2xl font-semibold">Latest Beach Reports</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6 py-4 rounded-lg shadow-md">
          {reports.map((report, i) => (
            <div
              key={report.id}
              className={`flex flex-row items-start justify-between py-4 border-t ${
                i === 0 ? "" : "border-gray-200"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">{report.beach.name}</p>
                <p className="text-sm text-gray-500">
                  <strong>User:</strong> {report.user.name}
                </p>
                <p className="text-sm font-medium text-gray-700 md:text-base">
                  <strong>Rating:</strong> {report.rating} / 5
                </p>
              </div>

              <div className="h-full w-px bg-gray-300 mx-4"></div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-black-600">Report:</p>
                <p className="text-sm text-gray-600">{report.reportText}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}