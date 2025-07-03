"use client";

import React from "react";
import { cn } from "@/utils/utils";
import {
  EXPECTED_APPLICATIONS_GENERATED,
  useApplications,
} from "@/utils/applications";
import { CreateApplication } from "@/components/create-application";

export const Goal = () => {
  const [applications] = useApplications();
  if (applications.length >= EXPECTED_APPLICATIONS_GENERATED) {
    return null;
  }
  return (
    <div className="bg-highlight flex flex-col items-center justify-center p-14 gap-8">
      <div className="flex flex-col gap-4 items-center max-w-md">
        <div className="text-selected-text text-4xl font-semibold font-display">
          Hit your goal
        </div>
        <div className="text-primary-text text-center">
          Generate and send out couple more job applications today to get hired
          faster
        </div>
        <CreateApplication size="lg" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          {Array.from({ length: EXPECTED_APPLICATIONS_GENERATED }).map(
            (_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-8 bg-selected-text rounded-full opacity-25",
                  {
                    ["opacity-100"]: index < applications.length,
                  }
                )}
              />
            )
          )}
        </div>
        <div>
          {applications.length} out of {EXPECTED_APPLICATIONS_GENERATED}
        </div>
      </div>
    </div>
  );
};
