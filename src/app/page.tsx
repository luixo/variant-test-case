import React from "react";
import { Goal } from "@/components/goal";
import { ApplicationsList } from "@/components/applications/list";
import { CreateApplication } from "@/components/create-application";

const Page = () => {
  return (
    <main className="flex flex-col gap-12">
      <div>
        <div className="flex justify-between items-center border-b border-b-border-secondary pb-4">
          <h1 className="text-5xl/15 font-semibold font-display">
            Applications
          </h1>
          <CreateApplication />
        </div>
        <ApplicationsList />
      </div>
      <Goal />
    </main>
  );
};

export default Page;
