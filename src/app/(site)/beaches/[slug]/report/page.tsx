"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ReportFormProps {
  params: Promise<{ slug: string }>;
}

export default function ReportForm({ params }: ReportFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session info
  const [slug, setSlug] = useState<string | null>(null);
  const [reportText, setReportText] = useState("");
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPaidSubscriber, setIsPaidSubscriber] = useState<boolean | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => setSlug(resolvedParams.slug));
  }, [params]);

  // Fetch user subscription status
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/user-subscription`)
        .then((res) => res.json())
        .then((data) => {
          setIsPaidSubscriber(data.isPaidSubscriber);
          if (!data.isPaidSubscriber) {
            router.replace("/"); // Redirect if not a paid subscriber
          }
        })
        .catch(() => {
          setError("Failed to check subscription status.");
        });
    } else if (status === "unauthenticated") {
      router.replace("/signin"); // Redirect to login if not signed in
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, reportText, rating }),
      });

      if (!res.ok) throw new Error("Failed to submit report");

      router.push(`/beaches/${slug}`);
    } catch (err) {
      setError("Error submitting report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPaidSubscriber === null) {
    return <p className="text-center text-gray-600 my-20">Checking subscription status...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-36">
      <h1 className="text-2xl font-bold text-cyan-500 mb-4">
        Submit a Report for{" "}
        {slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Loading..."}
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Report</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows={4}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Rating</label>
          <select
            className="w-full border rounded p-2 mt-1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}

