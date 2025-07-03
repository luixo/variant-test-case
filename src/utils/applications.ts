import { useLocalStorage } from "@/utils/store";
import { ExtractMultiline } from "@/utils/types";

const APPLICATIONS_STORAGE_KEY = "applications";
const DEFAULT_APPLICATIONS_VALUE: Application[] = [];
export const EXPECTED_APPLICATIONS_GENERATED = 5;

export const APPLICATION_TEMPLATE = `
Dear [Company] Team,

I am writing to express my interest in the [JobTitle] position.

My experience in the realm combined with my skills in [SkillsList] make me a strong candidate for this role.

[AdditionalDetails]

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.` as const;
export type TemplateParam = keyof ExtractMultiline<typeof APPLICATION_TEMPLATE>;
const TEMPLATE_PARAMS_RECORD: Record<TemplateParam, true> = {
  Company: true,
  JobTitle: true,
  SkillsList: true,
  AdditionalDetails: true,
};
export const TEMPLATE_PARAMS = Object.keys(
  TEMPLATE_PARAMS_RECORD
) as TemplateParam[];

export type Application = {
  id: string;
  values: Partial<Record<TemplateParam, string>>;
};

export const applyTemplate = (values: Partial<Record<TemplateParam, string>>) =>
  APPLICATION_TEMPLATE.trim().replace(
    /\[(\w*)\]/g,
    (match, key) => values[key as TemplateParam] ?? match
  );

export const getNewApplication = (id: string): Application => ({
  id,
  values: {},
});

export const useApplications = () =>
  useLocalStorage<Application[]>(
    APPLICATIONS_STORAGE_KEY,
    DEFAULT_APPLICATIONS_VALUE
  );
