"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialSignIn from "../SocialSignIn";
import Loader from "@/components/Common/Loader";

const Signin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await signIn("credentials", {
      email: loginData.email,
      password: loginData.password,
      redirect: false,
    });

    if (response?.error) {
      toast.error("Invalid email or password");
      console.error(response.error);
      setLoading(false);
    } else {
      toast.success("Login successful");
      router.push("/");
    }
  };

  return (
    <section className="bg-[#FCF6E1] py-14 lg:py-24">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center sm:px-12 md:px-[60px] shadow-md">
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

              {/* Google Sign-In Button */}
              <SocialSignIn />

              <span className="relative my-8 block text-center">
                <span className="absolute left-0 top-1/2 block h-px w-full bg-gray-300"></span>
                <span className="relative z-10 inline-block bg-white px-3 text-base text-black">
                  OR
                </span>
              </span>

              {/* Email/Password Login */}
              <form onSubmit={loginUser}>
                <div className="mb-[22px]">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-base text-black outline-none transition placeholder:text-gray-600 focus:border-[#e46926]"
                  />
                </div>
                <div className="mb-[22px]">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 bg-transparent px-5 py-3 text-base text-black outline-none transition placeholder:text-gray-600 focus:border-[#e46926]"
                  />
                </div>
                <div className="mb-9">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-cyan-500 bg-cyan-500 px-5 py-3 text-base text-white transition hover:bg-cyan-600"
                  >
                    Sign In {loading && <Loader />}
                  </button>
                </div>
              </form>

              <Link
                href="/forgot-password"
                className="mb-2 inline-block text-base text-black hover:text-[#e46926]"
              >
                Forgot Password?
              </Link>

              <p className="text-base text-black">
                Not a member yet?{" "}
                <Link href="/signup" className="text-[#e46926] hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
