import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public _app: App,
  public alertCtrl: AlertController) {

  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Logout Confirmation',
      message: 'Are you sure to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logMeOut();
          }
        }
      ]
    });
    confirm.present();
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this._app.getRootNav().setRoot(LoginPage);
    });
  }

}
