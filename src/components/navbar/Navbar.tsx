import React from "react";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";

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
          <SignedIn>
            <UserButton showName />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size="sm" variant="ghost">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">
                Get started <LogInIcon className="ml-1.5 h-5 w-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
