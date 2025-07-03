"use client";

import React from "react";
import {
  Application as ApplicationType,
  DEFAULT_RESPONSE,
  useApplications,
} from "@/utils/applications";
import Link from "next/link";
import { ActionButton } from "@/components/ui/action-button";

const Application: React.FC<{ application: ApplicationType }> = ({
  application,
}) => {
  const lastResponse =
    application.responses[application.responses.length - 1] || DEFAULT_RESPONSE;
  const [, setApplications] = useApplications();
  const removeApplication = React.useCallback(() => {
    setApplications((applications) =>
      applications.filter(({ id }) => id !== application.id)
    );
  }, [application.id, setApplications]);
  return (
    <div className="bg-secondary-bg p-6 flex flex-col gap-2 rounded-xl justify-between">
      <Link
        className="relative max-h-36 overflow-hidden h-full"
        href={`/application/${application.id}`}
      >
        <span className="whitespace-pre-wrap">{lastResponse}</span>
        <div className="absolute bottom-0 w-full h-10 bg-linear-to-t to-secondary-bg/0 from-secondary-bg/100" />
      </Link>
      <div className="flex justify-between gap-4">
        <ActionButton
          icon={{ src: "/trash.svg", alt: "Delete application" }}
          onClick={removeApplication}
        >
          Delete
        </ActionButton>
        <ActionButton
          icon={{ src: "/copy.svg", alt: "Copy application to clipboard" }}
          reverse
          onClick={() => navigator.clipboard.writeText(lastResponse.trim())}
        >
          Copy to clipboard
        </ActionButton>
      </div>
    </div>
  );
};

export const ApplicationsList = () => {
  const [applications] = useApplications();
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-x-4 gap-y-6">
      {applications.map((application) => (
        <Application key={application.id} application={application} />
      ))}
    </div>
  );
};
