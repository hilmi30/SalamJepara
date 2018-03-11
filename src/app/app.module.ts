import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritPage } from '../pages/favorit/favorit';
import { MapPage } from '../pages/map/map';
import { DetailPage } from '../pages/detail/detail';
import { StatPage } from '../pages/statistik/statistik';
import { AllReviewsPage } from '../pages/all-reviews/all-reviews';
import { ReviewPage } from '../pages/review/review';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PasswordResetPage } from '../pages/password-reset/password-reset';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Geolocation } from '@ionic-native/geolocation';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { DistanceProvider } from '../providers/distance/distance';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { AuthProvider } from '../providers/auth/auth';

//firebase config
export const firebaseConfig = {
    apiKey: "AIzaSyB86ElKAyGE7TN1_OpdViXzkKmAH6oiGGQ",
    authDomain: "salamjepara-8280b.firebaseapp.com",
    databaseURL: "https://salamjepara-8280b.firebaseio.com",
    projectId: "salamjepara-8280b",
    storageBucket: "salamjepara-8280b.appspot.com",
    messagingSenderId: "136107406743"
};

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    PasswordResetPage,
    HomePage,
    AboutPage,
    MapPage,
    FavoritPage,
    DetailPage,
    TabsPage,
    StatPage,
    AllReviewsPage,
    ReviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    PasswordResetPage,
    HomePage,
    AboutPage,
    MapPage,
    FavoritPage,
    DetailPage,
    TabsPage,
    StatPage,
    AllReviewsPage,
    ReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabaseModule,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FavoriteProvider,
    DistanceProvider,
    SocialSharing,
    Network,
    InAppBrowser,
    YoutubeVideoPlayer,
    AuthProvider
  ]
})
export class AppModule {}
