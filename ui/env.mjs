// Centralized environment variable access with validation at server startup.

export const env = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
  NEXT_PUBLIC_API_URL:               process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  CLERK_SECRET_KEY:                  process.env.CLERK_SECRET_KEY ?? "",
};

if (typeof window === "undefined") {
  const required = ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];
  const missing = required.filter(key => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}
