import Link from "next/link";
import React from "react";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  return (
    <nav className="flex justify-between items-center py-5">
      <div className=" flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="text-3xl font-semibold">
            <span className="text-blue-500">Blogs.</span>
          </h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link
          className="text-sm font-semibold hover:text-blue-500 transition-colors duration-300"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="text-sm font-semibold hover:text-blue-500 transition-colors duration-300"
          href={"/dashboard"}
        >
          Dashboard
        </Link>
        <Link
          className="text-sm font-semibold hover:text-blue-500 transition-colors duration-300"
          href={"/blogs"}
        >
          Blogs
        </Link>
      </div>
      {user ? (
        <>
          <div className="flex items-center gap-6">
            <p>{user.given_name}</p>
            <LogoutLink className={buttonVariants({ variant: "secondary" })}>
              Logout
            </LogoutLink>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-6">
            <LoginLink className={buttonVariants({ variant: "secondary" })}>
              Login
            </LoginLink>
            <RegisterLink className={buttonVariants({ variant: "blueBg" })}>
              Sign Up
            </RegisterLink>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
