import axios from "axios";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import OfferList from "./OfferList";

const PricingBox = ({ plan }: { plan: "Monthly" | "Yearly" }) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Select correct Stripe Price ID using NEXT_PUBLIC environment variables
  const priceId =
    plan === "Yearly"
      ? process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID;

  // Subscription handler
  const handleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session) {
      // Redirect to sign-in page if user is not signed in
      router.push("/signin");
      return;
    }

    if (!priceId) {
      console.error("Stripe Price ID is missing!");
      return;
    }

    try {
      // Pass both priceId and userId to your payment API
      const { data } = await axios.post("/api/payment", { 
        priceId,
        userId: session.user.id,
      });
      window.location.assign(data); // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-lg dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
        data-wow-delay=".1s"
      >
        {plan === "Yearly" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-cyan-500 px-5 py-2 text-base font-medium text-white">
            Best Value
          </p>
        )}

        <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
          {plan} Subscription
        </span>

        <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
          <span className="text-xl font-medium">$ </span>
          <span className="-ml-1 -tracking-[2px]">
            {plan === "Yearly" ? "50" : "15"}
          </span>
          <span className="text-base font-normal text-body-color dark:text-dark-6">
            {plan === "Yearly" ? " Per Year" : " Per Month"}
          </span>
        </h2>

        <div className="mb-[50px]">
          <h3 className="mb-5 text-lg font-medium text-dark dark:text-white">
            Features
          </h3>
          <div className="mb-10">
            <OfferList text="Access to all reports" />
            <OfferList text="Exclusive insights" />
            <OfferList text={plan === "Yearly" ? "Save $130 per year!" : "Cancel anytime"} />
          </div>
        </div>

        <div className="w-full">
          <button
            onClick={handleSubscription}
            className="inline-block rounded-md bg-cyan-500 px-7 py-2 text-center text-base font-medium text-white transition duration-300 hover:bg-cyan-500/90"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;


