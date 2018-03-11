import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
   private storage: Storage, afAuth: AngularFireAuth) {
    //Check if there is a user or not 
    const authObserver = afAuth.authState.subscribe( user => {
      if (!user) { 
        //go to LoginPage
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      } else {
        //go to TabsPage or HomePage
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      }
    });

    //check if local storage is null
    this.storage.get('favorite').then(val => {
      if(val == null){
        //set local storage to empty array
        let arr = [];
        this.storage.set('favorite', arr);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
