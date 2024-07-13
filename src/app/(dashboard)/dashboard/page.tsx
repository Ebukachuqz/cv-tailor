import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { auth } from "@clerk/nextjs/server";
import { Ghost } from "lucide-react";
import React from "react";
import { getUsersJobsAction } from "../_actions";

export default async function page() {
  const { userId } = auth();
  const jobs = await getUsersJobsAction(userId!);

  return (
    <MaxWidthWrapper className="flex flex-col gap-4">
      <div className="flex justify-between border-b border-zinc-400 py-2 items-center">
        <h1 className="font-bold text-4xl text-gray-900">Applied Jobs</h1>
        <div className="flex gap-4">
          <button className="px-2 py-1 bg-gray-200 rounded-md">Tab 1</button>
          <button className="px-2 py-1 bg-gray-200 rounded-md">Tab 2</button>
        </div>
      </div>
      <div>
        {jobs.length < 1 ? (
          <div className="mt-16 flex flex-col items-center gap-2">
            <Ghost className="h-8 w-8 text-zinc-800" />
            <h3 className="font-semibold text-xl">Pretty empty around here</h3>
            <p>Let&apos;s upload your first PDF.</p>
          </div>
        ) : (
          <div>{"jobs"}</div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
