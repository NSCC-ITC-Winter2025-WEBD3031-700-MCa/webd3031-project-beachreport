import SignUp from "@/components/Auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign Up | Play SaaS Starter Kit and Boilerplate for Next.js",
};

const SignupPage = () => {
  return (
    <>

      <SignUp />
    </>
  );
};

export default SignupPage;
