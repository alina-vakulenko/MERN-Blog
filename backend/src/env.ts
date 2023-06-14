import { cleanEnv, port, str, num } from "envalid";

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  MONGODB_USERNAME: str(),
  MONGODB_PASSWORD: str(),
  MONGODB_DATABASE_NAME: str(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES_IN_MINUTES: num(),
  REFRESH_TOKEN_EXPIRES_IN_DAYS: num(),
});

export default env;
