"use client";

import React from "react";
import Image from "next/image";
import {
  EXPECTED_APPLICATIONS_GENERATED,
  useApplications,
} from "@/utils/applications";
import { cn } from "@/utils/utils";

export const HeaderApplications = () => {
  const [applications] = useApplications();
  const cappedApplicationsAmount = Math.min(
    applications.length,
    EXPECTED_APPLICATIONS_GENERATED
  );
  return (
    <div className="flex gap-4 items-center">
      <div className="text-end">
        {`${cappedApplicationsAmount}/${EXPECTED_APPLICATIONS_GENERATED} applications generated`}
      </div>
      {cappedApplicationsAmount === EXPECTED_APPLICATIONS_GENERATED ? (
        <Image src="/checkmark.svg" alt="Done" width={28} height={28} />
      ) : (
        <div className="flex gap-1">
          {Array.from({ length: EXPECTED_APPLICATIONS_GENERATED }).map(
            (_, index) => (
              <div
                key={index}
                className={cn(
                  "size-2 rounded-full bg-selected-text opacity-25",
                  {
                    ["opacity-100"]: index < cappedApplicationsAmount,
                  }
                )}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
