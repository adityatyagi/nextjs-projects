//https://dev.to/krzysztofzuraw/how-to-type-nextjs-env-variables-in-typescript-50cg
namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OPENAI_API_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
