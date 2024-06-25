"use client";

import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

function AuthBtns() {
  return (
    <>
      <LoginLink
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
        })}
      >
        Sign in
      </LoginLink>
      <RegisterLink
        className={buttonVariants({
          size: "sm",
        })}
      >
        Get started <ArrowRight className="ml-1.5 h-5 w-5" />
      </RegisterLink>
    </>
  );
}

export default AuthBtns;
