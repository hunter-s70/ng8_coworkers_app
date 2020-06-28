// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
