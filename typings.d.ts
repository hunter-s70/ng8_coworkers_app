declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  FBS_API_KEY: string;
  FBS_AUTH_DOMAIN: string;
  FBS_DB_URL: string;
  FBS_PROJECT_ID: string;
  FBS_STORAGE_BUCKET: string;
  FBS_MES_SENDER_ID: string;
  FBS_APP_ID: string;
}

interface GlobalEnvironment {
  process: Process;
}
