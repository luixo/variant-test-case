"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/utils";
import { Application } from "@/utils/applications";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import React from "react";
import * as z from "zod/v4-mini";
import Image from "next/image";
import { UseMutationResult } from "@tanstack/react-query";

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
export const validationForm = z.object({
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
    generateMutation: UseMutationResult<
      string,
      Error,
      Application["values"],
      unknown
    >;
  }
> = ({
  className,
  application,
  setApplication,
  generateMutation,
  ...props
}) => {
  const form = useAppForm({
    defaultValues: {
      companyName: application?.values.companyName ?? "",
      title: application?.values.title ?? "",
      skills: application?.values.skills ?? "",
      additionalDetails: application?.values.additionalDetails ?? "",
    },
    validators: {
      onMount: validationForm,
      onChange: validationForm,
      onSubmit: validationForm,
    },
    onSubmit: ({ value }) => {
      setApplication((application) => ({
        ...application,
        values: value,
      }));
      generateMutation.mutate(value);
    },
  });
  const title =
    application && application.values.title && application.values.companyName
      ? `${application.values.companyName}, ${application.values.title}`
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
          <Button
            size="lg"
            type="submit"
            variant={
              generateMutation.status === "success" ? "white" : undefined
            }
            disabled={!canSubmit}
            className={cn(
              "whitespace-normal",
              generateMutation.status === "error" ? "bg-destructive" : undefined
            )}
          >
            {generateMutation.status === "pending" ? (
              <Image
                src="/loading.svg"
                alt="Loading.."
                width={24}
                height={24}
              />
            ) : generateMutation.status === "success" ? (
              <div className="flex gap-3">
                <Image
                  src="/reload.svg"
                  alt="Regenerate"
                  width={24}
                  height={24}
                />
                Try again
              </div>
            ) : generateMutation.status === "error" ? (
              `${String(generateMutation.error)}, try again?`
            ) : (
              "Generate Now"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
