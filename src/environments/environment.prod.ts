export const environment = {
  production: true,
  firebase: {
    apiKey: process.env.FBS_API_KEY,
    authDomain: process.env.FBS_AUTH_DOMAIN,
    databaseURL: process.env.FBS_DB_URL,
    projectId: 'coworkers-cc0e8',
    storageBucket: process.env.FBS_STORAGE_BUCKET,
    messagingSenderId: process.env.FBS_MES_SENDER_ID,
    appId: process.env.FBS_APP_ID
  }
};
