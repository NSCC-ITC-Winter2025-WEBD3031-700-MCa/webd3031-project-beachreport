import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About | Shorecast - Nova Scotia's Beach Reporting Website",
  description: "Learn about Shorecast",
};

const AboutPage = () => {
  return (
    <main>
      <About />
    </main>
  );
};

export default AboutPage;
