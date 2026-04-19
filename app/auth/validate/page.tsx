import { validateAuthenticatedWhitelist } from "@/app/actions/auth";

export default async function AuthValidatePage() {
  await validateAuthenticatedWhitelist();
  return null;
}
