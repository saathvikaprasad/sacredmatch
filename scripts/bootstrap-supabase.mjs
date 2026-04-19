import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadEnv, requireEnv } from "./_env.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(projectRoot);

const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error(
    "Missing SUPABASE_ACCESS_TOKEN. Add a Supabase personal access token if you want this script to apply supabase/setup.sql remotely."
  );
  process.exit(1);
}

const projectUrl = new URL(requireEnv("NEXT_PUBLIC_SUPABASE_URL"));
const projectRef = projectUrl.hostname.split(".")[0];
const query = fs.readFileSync(path.join(projectRoot, "supabase", "setup.sql"), "utf8");

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/migrations`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "candidate-directory-bootstrap",
    query
  })
});

const text = await response.text();

if (!response.ok) {
  console.error(text);
  process.exit(1);
}

console.log("Supabase bootstrap request submitted successfully.");
console.log(text);
