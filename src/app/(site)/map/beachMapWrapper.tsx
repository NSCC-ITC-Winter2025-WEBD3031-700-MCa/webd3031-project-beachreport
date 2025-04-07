"use client";

import dynamic from "next/dynamic";

// Dynamically import BeachMap and disable SSR
const BeachMap = dynamic(() => import("@/components/BeachMap"), { ssr: false });

const BeachMapWrapper = () => {
  return <BeachMap />;
};

export default BeachMapWrapper;

