import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseProdConfig = {
  apiKey: process.env.FBS_API_KEY,
  authDomain: process.env.FBS_AUTH_DOMAIN,
  databaseURL: process.env.FBS_DB_URL,
  projectId: 'coworkers-cc0e8',
  storageBucket: process.env.FBS_STORAGE_BUCKET,
  messagingSenderId: process.env.FBS_MES_SENDER_ID,
  appId: process.env.FBS_APP_ID
};

const firebaseConfig = process.env.NODE_ENV === 'production' ? firebaseProdConfig : environment.firebase;

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class AppFirebaseModule { }
