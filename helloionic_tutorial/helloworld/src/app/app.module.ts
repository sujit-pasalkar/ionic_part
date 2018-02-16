import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import {AngularFireDatabseModule} from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { Camera } from '@ionic-native/camera';
 import { FIREBASE_CONFIG } from './app.firebase.config'
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase'

@NgModule({
  declarations: [
    MyApp,
   // HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence() //.enablePersistence() used for offline storage
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
   // HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFirestore
  ]
})
export class AppModule {}
