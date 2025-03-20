"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialSignIn from "../SocialSignIn";
import SwitchOption from "../SwitchOption";
import MagicLink from "../MagicLink";
import Loader from "@/components/Common/Loader";

const Signin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isPassword, setIsPassword] = useState(false);
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
    <section className="bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center">
                <Link href="/" className="mx-auto inline-block max-w-[160px]">
                  <Image src="/images/logo/logo.svg" alt="logo" width={140} height={30} className="dark:hidden" />
                  <Image src="/images/logo/logo-white.svg" alt="logo" width={140} height={30} className="hidden dark:block" />
                </Link>
              </div>

              {/* Social Login Buttons */}
              <SocialSignIn />

              <span className="relative my-8 block text-center">
                <span className="absolute left-0 top-1/2 block h-px w-full bg-stroke dark:bg-dark-3"></span>
                <span className="relative z-10 inline-block bg-white px-3 text-base dark:bg-dark-2">OR</span>
              </span>

              {/* Email/Password Login */}
              <SwitchOption isPassword={isPassword} setIsPassword={setIsPassword} />

              {isPassword ? (
                <form onSubmit={loginUser}>
                  <div className="mb-[22px]">
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-[22px]">
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-9">
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition hover:bg-primary/90"
                    >
                      Sign In {loading && <Loader />}
                    </button>
                  </div>
                </form>
              ) : (
                <MagicLink />
              )}

              <Link href="/forgot-password" className="mb-2 inline-block text-base text-dark hover:text-primary dark:text-white dark:hover:text-primary">
                Forgot Password?
              </Link>

              <p className="text-body-secondary text-base">
                Not a member yet?{" "}
                <Link href="/signup" className="text-primary hover:underline">
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
