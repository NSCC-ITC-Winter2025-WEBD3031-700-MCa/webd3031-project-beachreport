import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing Page | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is pricing page description",
};

const PricingPage = () => {
  return (
    <>
      <Pricing />
    </>
  );
};

export default PricingPage;
