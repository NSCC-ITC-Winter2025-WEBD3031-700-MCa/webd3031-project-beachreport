"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Beach {
  name: string;
  slug: string;
  location: string;
}

const Hero = () => {
  const [search, setSearch] = useState("");
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [filteredBeaches, setFilteredBeaches] = useState<Beach[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch beach data when the component mounts
    fetch("/api/beaches")
      .then((res) => res.json())
      .then((data) => setBeaches(data))
      .catch((err) => console.error("Error fetching beaches:", err));
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBeaches([]);
    } else {
      const lowerCaseSearch = search.toLowerCase();
      setFilteredBeaches(
        beaches.filter((beach) => {
          const name = beach.name.toLowerCase();
          const location = beach.location.toLowerCase();
          if (lowerCaseSearch.length === 1) {
            // Only include beaches where the name or location starts with the search letter
            return name.startsWith(lowerCaseSearch) || location.startsWith(lowerCaseSearch);
          } else {
            // Otherwise, check if the name or location contains the search query anywhere
            return name.includes(lowerCaseSearch) || location.includes(lowerCaseSearch);
          }
        })
      );
    }
  }, [search, beaches]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (filteredBeaches.length === 1) {
      router.push(`/beaches/${filteredBeaches[0].slug}`);
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative overflow-visible pt-[120px] md:pt-[130px] lg:pt-[160px] bg-[url('/images/waves.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-start">
            <div className="w-full px-4">
              <div className="hero-content wow fadeInUp max-w-[780px] text-left" data-wow-delay=".2s">
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

        <div className="w-full mt-12 bg-[#FCF6E1] bg-opacity-60">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Search Bar Section */}
            <div className="relative flex flex-col items-start">
              <label htmlFor="search-beach" className="text-3xl font-akshar text-black my-5">
                Find your beach...
              </label>
              <form onSubmit={handleSearchSubmit} className="relative w-full overflow-visible">
                <input
                  id="search-beach"
                  type="text"
                  placeholder="Search by Beach or Location"
                  className="px-4 py-2 w-full text-lg drop-shadow-lg bg-white border border-black rounded-xl text-gray-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredBeaches.length > 0 && (
                  <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-xl mb-10 shadow-lg z-50">
                    {filteredBeaches.map((beach) => (
                      <li
                        key={beach.slug}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => router.push(`/beaches/${beach.slug}`)}
                      >
                        {beach.name} - {beach.location}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>


            {/* Logo Section */}
            <div className="flex flex-col lg:items-end items-center">
              <Image src="/images/logo/shorecast-logo.png" alt="Shorecast-logo" width="300" height="300" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;


