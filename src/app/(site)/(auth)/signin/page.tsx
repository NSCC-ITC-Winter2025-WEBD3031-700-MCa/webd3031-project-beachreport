import Signin from "@/components/Auth/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign In | Play SaaS Starter Kit and Boilerplate for Next.js",
};

const SigninPage = () => {
  return (
    <>

      <Signin />
    </>
  );
};

export default SigninPage;
