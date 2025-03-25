import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pricing | Shorecast - Nova Scotia's Beach Reporting Website",
  description: "Choose your susbscription",
};

const PricingPage = () => {
  return (
    <>
      <Pricing />
    </>
  );
};

export default PricingPage;
