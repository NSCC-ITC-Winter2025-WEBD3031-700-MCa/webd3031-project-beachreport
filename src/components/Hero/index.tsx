import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pt-[120px] md:pt-[130px] lg:pt-[160px] bg-[url('/images/waves.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-start">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp max-w-[780px] text-left"
                data-wow-delay=".2s"
              >
                <h1 className="font-abril text-stroke-orange mb-6 text-6xl sm:text-8xl lg:text-9xl">
                  Shorecast
                </h1>
                <p className="font-abril text-stroke-white mb-9 max-w-[600px] text-white text-2xl sm:text-4xl">
                  Nova Scotia&apos;s Beach Reporting Website.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-12 bg-[#FCF6E1] opacity-65">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Search Bar Section */}
            <div className="flex flex-col items-start">
              <label
                htmlFor="search-beach"
                className="text-3xl font-akshar text-black mb-4"
              >
                Find your beach...
              </label>
              <input
                id="search-beach"
                type="text"
                placeholder="Search by Beach or County"
                className="px-4 py-2 w-full text-lg drop-shadow-lg bg-white border border-2 border-black rounded-xl text-gray-700"
              />
            </div>

            {/* Logo Section */}
            <div className="flex flex-col items-end">
              <Image
                src="/images/logo/shorecast-logo.png"
                alt="Shorecast-logo"
                width="300"
                height="300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;


