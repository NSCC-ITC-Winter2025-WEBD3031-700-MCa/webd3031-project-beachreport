"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-[#FCF6E1] pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
      <div className="mb-[60px] text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Subscribe to <span className="text-cyan-500">Beach Report</span> Today!
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Get exclusive insights and stay ahead with our premium reports.
        </p>
      </div>


        <div className="-mx-4 flex flex-wrap justify-center">
          {/* Render only the two fixed plans */}
          <PricingBox plan="Monthly" />
          <PricingBox plan="Yearly" />
        </div>
      </div>
    </section>
  );
};

export default Pricing;

