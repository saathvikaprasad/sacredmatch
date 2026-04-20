import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadEnv, requireEnv } from "./_env.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
loadEnv(projectRoot);

const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "Missing SUPABASE_ACCESS_TOKEN. Add a Supabase personal access token to apply migrations.",
  );
  process.exit(1);
}

const projectUrl = new URL(requireEnv("NEXT_PUBLIC_SUPABASE_URL"));
const projectRef = projectUrl.hostname.split(".")[0];
const query = fs.readFileSync(
  path.join(projectRoot, "supabase", "migrations", "make_age_nullable.sql"),
  "utf8",
);

const response = await fetch(
  `https://api.supabase.com/v1/projects/${projectRef}/database/migrations`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "make-age-nullable",
      query,
    }),
  },
);

const text = await response.text();

if (!response.ok) {
  console.error("Migration failed:", text);
  process.exit(1);
}

console.log("Migration applied successfully.");
console.log(text);
