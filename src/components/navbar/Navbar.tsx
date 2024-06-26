import React from "react";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AuthBtns from "./AuthBtns";

type Props = {};
export default function Navbar({}: Props) {
  return (
    <nav className="mb-4 w-full sticky flex items-center h-14 inset-x-0 top-0 z-10 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="w-full h-full flex justify-between items-center border-zinc-200">
        <Link href={"/"}>
          <span className="font-semibold">Hermes</span>
        </Link>
        <div className="flex gap-2 justify-between items-center">
          <Link
            href="/pricing"
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            Pricing
          </Link>
          <AuthBtns />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
