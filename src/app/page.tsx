import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-scree">
      <section className="bg-gray-100 p-10 text-center flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Increase Your Job Luck</h1>
        <h1 className="text-4xl font-bold">Quickly Apply to more, Save Time</h1>
        <p className="text-xl max-w-prose mx-auto text-zinc-700 sm:text-lg">
          Hermes is an AI-powered tool that generates tailored CVs to job
          description in minutes.
        </p>
        <div className="flex justify-center gap-4">
          <Link className={buttonVariants({ size: "lg" })} href="/">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
