"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getNewApplication, useApplications } from "@/utils/applications";
import { useRouter } from "next/navigation";

export const CreateApplication: React.FC<
  React.ComponentProps<typeof Button> & { shrinkable?: boolean }
> = ({ shrinkable, ...props }) => {
  const router = useRouter();
  const [, setApplications] = useApplications();
  const [nextApplicationId] = React.useState(() =>
    typeof window === "undefined" ? "temp" : window.crypto.randomUUID()
  );
  const addApplication = React.useCallback(() => {
    const newApplication = getNewApplication(nextApplicationId);
    setApplications((prevApplications) => [
      ...prevApplications,
      newApplication,
    ]);
    router.push(`/application/${newApplication.id}`);
  }, [nextApplicationId, router, setApplications]);
  return (
    <Button onClick={addApplication} {...props}>
      <Image src="/plus.svg" alt="Add" width={24} height={24} />
      <span className={shrinkable ? "hidden sm:inline" : undefined}>
        Create new
      </span>
    </Button>
  );
};
