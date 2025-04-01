"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import SocialSignIn from "../SocialSignIn";
import Loader from "@/components/Common/Loader";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const value = Object.fromEntries(data.entries());
    const finalData = { ...value };

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Successfully registered");
        router.push("/signin");
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="bg-white py-14 lg:py-[90px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-xl bg-[#689f9e] px-8 py-14 text-center shadow-md sm:px-12 md:px-[60px]">
              {/* Logo */}
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Image
                    src="/images/logo/shorecast-logo.png"
                    alt="Shorecast Logo"
                    width={160}
                    height={30}
                  />
                </Link>
              </div>

              {/* Google Sign-In */}
              <SocialSignIn />

              <span className="relative my-8 block text-center">
                <span className="absolute left-0 top-1/2 block h-px w-full bg-gray-300"></span>
                <span className="relative z-10 inline-block bg-[#689f9e] px-3 text-base text-[#053c5e]">
                  OR
                </span>
              </span>

              {/* Email/Password Sign Up Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    className="w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-gray-200 focus:border-[#e46926]"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    className="w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-gray-200 focus:border-[#e46926]"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className="w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-base text-white outline-none transition placeholder:text-gray-200 focus:border-[#e46926]"
                  />
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-[#e46926] bg-[#e46926] px-5 py-3 text-base text-white transition hover:bg-[#d15b20]"
                  >
                    Sign Up {loading && <Loader />}
                  </button>
                </div>
              </form>

              <p className="mb-4 text-base text-white">
                By creating an account you agree to our{" "}
                <Link href="/#" className="text-[#e46926] hover:underline">
                  Privacy
                </Link>{" "}
                and{" "}
                <Link href="/#" className="text-[#e46926] hover:underline">
                  Policy
                </Link>
                .
              </p>

              <p className="text-base text-white">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#e46926] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
