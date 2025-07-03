"use client";

import { ActionButton } from "@/components/ui/action-button";
import { cn } from "@/utils/utils";
import {
  Application,
  applyTemplate,
  TEMPLATE_PARAMS,
} from "@/utils/applications";

const DEFAULT_TEXT = "Your personalized job application will appear here...";

export const ApplicationResult: React.FC<
  React.ComponentProps<"div"> & { application: Application | undefined }
> = ({ application, className, ...props }) => {
  const content =
    application &&
    TEMPLATE_PARAMS.every((param) => Boolean(application.values[param]))
      ? applyTemplate(application.values)
      : DEFAULT_TEXT;
  return (
    <div
      className={cn(
        "rounded-xl bg-secondary-bg p-6 flex flex-col gap-4 justify-between text-primary-text min-h-72",
        className
      )}
      {...props}
    >
      <span className="whitespace-pre-wrap">{content}</span>
      <ActionButton
        icon={{ src: "/copy.svg", alt: "Copy application to clipboard" }}
        reverse
        onClick={() => navigator.clipboard.writeText(content.trim())}
      >
        Copy to clipboard
      </ActionButton>
    </div>
  );
};
