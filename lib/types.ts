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
  age: number | null;
  date_of_birth: string | null;
  time_of_birth: string | null;
  star: string | null;
  place_of_birth: string | null;
  gothra: string | null;
  nationality_preference: string | null;
  language_preference: string[] | null;
  father_name: string;
  mother_name: string | null;
  email: string | null;
  mobile_country_code: string | null;
  mobile_number: string | null;
  gender: "male" | "female" | null;
  additional_fields: Record<string, string> | null;
  image_url: string | null;
  created_at: string;
};

export type CandidatePayload = {
  full_name: string;
  age?: number | null;
  date_of_birth?: string | null;
  time_of_birth?: string | null;
  star: string | null;
  place_of_birth?: string | null;
  gothra?: string | null;
  nationality_preference?: string | null;
  language_preference?: string[] | null;
  father_name: string;
  mother_name?: string | null;
  email?: string | null;
  mobile_country_code?: string | null;
  mobile_number?: string | null;
  gender?: string | null;
  additional_fields: Record<string, string>;
  image_url?: string | null;
};
