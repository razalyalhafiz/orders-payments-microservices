import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { EnvServiceFactory } from '../services/env.service.provider';

const _env = EnvServiceFactory();

@NgModule({
  imports: [AngularFireModule.initializeApp({
    apiKey: _env.apiKey,
    authDomain: _env.authDomain,
    databaseURL: _env.databaseURL,
    projectId: _env.projectId,
    storageBucket: _env.storageBucket,
    messagingSenderId: _env.messagingSenderId,
    appId: _env.appId,
    measurementId: _env.measurementId,
  })],
  exports: [AngularFireModule, AngularFireAuthModule],
})
export class AppFirebaseModule { }
