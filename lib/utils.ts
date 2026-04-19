import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

export function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function buildAdditionalFields(entries: Array<{ key: string; value: string }>) {
  return entries.reduce<Record<string, string>>((accumulator, entry) => {
    if (entry.key.trim()) {
      accumulator[entry.key.trim()] = entry.value.trim();
    }

    return accumulator;
  }, {});
}
