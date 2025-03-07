import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="bg-white grid grid-cols-1 lg:grid-cols-12 py-10 items-center">
     {/* Button Section */}
      <div className="lg:col-span-3 lg:col-start-2 flex flex-col items-center text-2xl text-black">
        <Link
          href="/signup"
          className="rounded-3xl border border-black bg-[#7AA38D] px-20 py-5 transition mb-3 hover:bg-[#9FD3B7]"
        >
          JOIN TODAY!
        </Link>
        <p className="mt-5 text-xl">To start rating Beaches!</p>
        <div className="my-2">
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>
      </div>


      {/* Paragraph Section */}
      <div className="lg:col-span-7 lg:col-start-6 lg:border-l border-black px-10 flex items-center">
        <p className="font-akshar text-black text-2xl p-5 lg:ml-10">
          Discovering the ideal beach on a warm summer day should be a breeze! With over
          <strong> 7,500 km of coastline, </strong>
          Nova Scotia ensures you&apos;re never more than 56 km from the ocean.
          At Shorecast, we provide all the details you need to find the perfect beach for your adventure.
          <br /><br />
          Become a member to rate beaches and see what others are saying!
          Your insights help fellow beachgoers discover the best spots,
          and you&apos;ll gain access to real-time ratings on all beaches across the province.
          <strong> Join today </strong>and make every beach day better!
        </p>
      </div>
    </div>
  );
};

export default CallToAction;


