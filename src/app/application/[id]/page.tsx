"use client";

import React from "react";
import { ApplicationForm } from "@/components/application/form";
import { ApplicationResult } from "@/components/application/result";
import { Goal } from "@/components/goal";
import {
  Application,
  getNewApplication,
  getResponse,
  useApplications,
} from "@/utils/applications";
import { useMutation } from "@tanstack/react-query";

const findApplication = (applications: Application[], lookupId: string) => {
  const applicationIndex = applications.findIndex(({ id }) => lookupId === id);
  return [applications[applicationIndex], applicationIndex] as const;
};

const Page: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = React.use(params);
  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);
  const [applications, setApplications] = useApplications();
  const [application] = findApplication(applications, id);
  const setApplication = React.useCallback(
    (setStateAction: React.SetStateAction<Application>) => {
      setApplications((applications) => {
        const [matchedApplication, matchedIndex] = findApplication(
          applications,
          id
        );
        const nextApplication =
          typeof setStateAction === "function"
            ? setStateAction(matchedApplication || getNewApplication(id))
            : setStateAction;
        if (matchedIndex === -1) {
          return [...applications, nextApplication];
        }
        return [
          ...applications.slice(0, matchedIndex),
          nextApplication,
          ...applications.slice(matchedIndex + 1),
        ];
      });
    },
    [id, setApplications]
  );
  const [currentIndex, setCurrentIndex] = React.useState(
    (application?.responses.length ?? 1) - 1
  );
  const generateMutation = useMutation<string, Error, Application["values"]>({
    mutationFn: (variables) => getResponse(variables),
    onSuccess: (response) => {
      setApplication((application) => ({
        ...application,
        responses: [...application.responses, response],
      }));
      setSubmitSuccessful(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    },
  });
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8">
        <ApplicationForm
          application={application}
          setApplication={setApplication}
          className="flex-1"
          generateMutation={generateMutation}
        />
        <ApplicationResult
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          application={application}
          isLoading={generateMutation.status === "pending"}
          className="flex-1"
        />
      </div>
      {isSubmitSuccessful ? <Goal /> : null}
    </>
  );
};

export default Page;
