import { validationForm } from "@/components/application/form";
import { useLocalStorage } from "@/utils/store";
import { z } from "zod/v4-mini";
import OpenAI from "openai";

const APPLICATIONS_STORAGE_KEY = "applications";
const DEFAULT_APPLICATIONS_VALUE: Application[] = [];
export const EXPECTED_APPLICATIONS_GENERATED = 5;

export const DEFAULT_RESPONSE =
  "Your personalized job application will appear here...";

export type Application = {
  id: string;
  values: z.infer<typeof validationForm>;
  responses: string[];
};

export const getNewApplication = (id: string): Application => ({
  id,
  values: {
    title: "",
    companyName: "",
    skills: "",
    additionalDetails: "",
  },
  responses: [],
});

export const useApplications = () =>
  useLocalStorage<Application[]>(
    APPLICATIONS_STORAGE_KEY,
    DEFAULT_APPLICATIONS_VALUE
  );

declare global {
  // external interface extension
  interface Window {
    OPENAI_API_KEY?: string;
  }
}

const client = new OpenAI({ apiKey: "fake", dangerouslyAllowBrowser: true });
export const getResponse = async (input: z.infer<typeof validationForm>) => {
  const localApiKey = window.OPENAI_API_KEY;
  if (!localApiKey) {
    throw new Error(`Expected to have a key in window.OPENAI_API_KEY`);
  }
  client.apiKey = localApiKey;
  const response = await client.responses.create({
    model: "gpt-4.1",
    input: `Write a job application leter:
    - Job title: ${input.title}
    - Company name: ${input.companyName}
    - My skills: ${input.skills}
    - Additional details: ${input.additionalDetails}`,
  });
  return response.output_text;
};
