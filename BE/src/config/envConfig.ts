import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || fallback!;
}

export const env = {
  PORT: getEnvVar("PORT", "5000"),
  BASIC_API_URL: getEnvVar("BASIC_API_URL", "/"),
  MONGO_URI: getEnvVar("MONGO_URI", "mongodb://localhost:27017/teleMedicine"),
  JWT_ACCESS: getEnvVar("JWT_ACCESS_SECRET", "supersecret"),
};
