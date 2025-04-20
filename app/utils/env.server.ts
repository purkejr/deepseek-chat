export function getEnv() {
  return {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  };
}

declare global {
  var ENV: ReturnType<typeof getEnv>;
  interface Window {
    ENV: ReturnType<typeof getEnv>;
  }
}