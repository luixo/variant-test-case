"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/utils";
import { Application } from "@/utils/applications";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";
import * as z from "zod/v4-mini";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: Input,
    TextArea: Textarea,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

const DEFAULT_TITLE = "New application";
const MAX_TEXTAREA_LENGTH = 1200;
const validationForm = z.object({
  companyName: z.string().check(z.minLength(1)),
  title: z.string().check(z.minLength(1)),
  skills: z.string().check(z.minLength(1)),
  additionalDetails: z
    .string()
    .check(z.minLength(1), z.maxLength(MAX_TEXTAREA_LENGTH)),
});

export const ApplicationForm: React.FC<
  React.ComponentProps<"form"> & {
    application: Application | undefined;
    setApplication: React.Dispatch<React.SetStateAction<Application>>;
    onSuccessfulSubmit: () => void;
  }
> = ({
  className,
  application,
  setApplication,
  onSuccessfulSubmit,
  ...props
}) => {
  const form = useAppForm({
    defaultValues: {
      companyName: application?.values.Company ?? "",
      title: application?.values.JobTitle ?? "",
      skills: application?.values.SkillsList ?? "",
      additionalDetails: application?.values.AdditionalDetails ?? "",
    },
    validators: {
      onMount: validationForm,
      onChange: validationForm,
      onSubmit: validationForm,
    },
    onSubmit: ({ value }) => {
      setApplication((application) => ({
        ...application,
        values: {
          Company: value.companyName,
          JobTitle: value.title,
          SkillsList: value.skills,
          AdditionalDetails: value.additionalDetails,
        },
      }));
      onSuccessfulSubmit();
    },
  });
  const title =
    application && application.values.JobTitle && application.values.Company
      ? `${application.values.Company}, ${application.values.JobTitle}`
      : DEFAULT_TITLE;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <h2
        className={cn("text-4xl font-bold pb-3 border-b font-display", {
          "opacity-50": title === DEFAULT_TITLE,
        })}
      >
        {title}
      </h2>
      <div className="flex gap-4">
        <form.AppField name="companyName">
          {(field) => (
            <field.TextField
              label="Job title"
              className="flex-1"
              value={field.state.value}
              onChange={(e) => field.setValue(e.currentTarget.value)}
              placeholder="Product manager"
              aria-invalid={
                (field.state.meta.errorMap.onSubmit?.length ?? 0) !== 0
              }
            />
          )}
        </form.AppField>
        <form.AppField name="title">
          {(field) => (
            <field.TextField
              label="Company"
              className="flex-1"
              value={field.state.value}
              onChange={(e) => field.setValue(e.currentTarget.value)}
              placeholder="Apple"
              aria-invalid={
                (field.state.meta.errorMap.onSubmit?.length ?? 0) !== 0
              }
            />
          )}
        </form.AppField>
      </div>
      <form.AppField name="skills">
        {(field) => (
          <field.TextField
            label="I am good at..."
            value={field.state.value}
            onChange={(e) => field.setValue(e.currentTarget.value)}
            placeholder="HTML, CSS and doing things in time"
            aria-invalid={
              (field.state.meta.errorMap.onSubmit?.length ?? 0) !== 0
            }
          />
        )}
      </form.AppField>
      <form.AppField name="additionalDetails">
        {(field) => (
          <div>
            <field.TextArea
              label="Additional details"
              value={field.state.value}
              onChange={(e) => field.setValue(e.currentTarget.value)}
              placeholder="Describe why you are a great fit or paste your bio"
              aria-invalid={
                field.state.meta.errors.length !== 0 &&
                field.state.value.length !== 0
              }
              inputClassName="resize-none h-52"
            />
            <div className="mt-1.5 text-sm text-secondary-text">
              {field.state.value.length}/{MAX_TEXTAREA_LENGTH}
            </div>
          </div>
        )}
      </form.AppField>
      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <Button size="lg" type="submit" disabled={!canSubmit}>
            Generate Now
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
