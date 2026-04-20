export type AllowedUserRole = "view" | "edit";

export type AllowedUser = {
  id: string;
  email: string;
  role: AllowedUserRole;
};

export type Candidate = {
  id: string;
  created_by: string;
  full_name: string;
  age: number;
  date_of_birth: string;
  star: string | null;
  father_name: string;
  mother_name: string | null;
  email: string | null;
  mobile_country_code: string | null;
  mobile_number: string | null;
  gender: "male" | "female" | null;
  language: string | null;
  additional_fields: Record<string, string> | null;
  image_url: string | null;
  created_at: string;
};

export type CandidatePayload = {
  full_name: string;
  age: number;
  date_of_birth: string;
  star: string | null;
  father_name: string;
  mother_name?: string | null;
  email?: string | null;
  mobile_country_code?: string | null;
  mobile_number?: string | null;
  gender?: string | null;
  language?: string | null;
  additional_fields: Record<string, string>;
  image_url?: string | null;
};
