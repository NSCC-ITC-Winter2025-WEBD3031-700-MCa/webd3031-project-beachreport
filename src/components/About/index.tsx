import Image from "next/image";

const About = () => {
  return (
    <>
      <section
        id="about"
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
                  About Shorecast
                </h1>
                <p className="font-abril text-stroke-white mb-9 max-w-[600px] text-white text-2xl sm:text-4xl">
                  Learn more about Nova Scotia&apos;s Beach Reporting Website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-8 pt-20 lg:pb-[70px] lg:pt-[120px]">
        <div className="container">
          <div className="wow fadeInUp" data-wow-delay=".2s">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <div className="mb-12 max-w-[540px] lg:mb-0">
                  <h2 className="mb-5 text-3xl font-bold leading-tight text-dark sm:text-[40px] sm:leading-[1.2]">
                    Discover the beauty of Nova Scotia&apos;s beaches.
                  </h2>
                  <p className="mb-10 text-base leading-relaxed text-body-color">
                    At Shorecast, we provide up-to-date reports on Nova Scotia&apos;s beaches to help you plan your perfect day by the shore.
                  </p>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]">
                  <Image
                    src="/images/about/crystalcrescentbeach.jpg"
                    alt="Crystal Crescent Beach"
                    fill
                    className="h-full w-full object-cover object-center rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
