import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import Bottom from "@/components/Bottom";
import Hero from "@/components/Hero";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shorecast - Nova Scotia's Beach Reporting Website",
  description: "With over 7,500 km of coastline, Nova Scotia ensures you're never more than 56 km from the ocean. At Shorecast, we provide all the details you need to find the perfect beach for your adventure.",
};

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <CallToAction />
      <Bottom/>
    </main>
  );
}
