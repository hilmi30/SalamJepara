import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, LoadingController } from 'ionic-angular';
import { ReviewPage } from '../review/review';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-all-reviews',
  templateUrl: 'all-reviews.html',
})
export class AllReviewsPage {

  nama: any;                             revi: Array<any>;  control: any;
  key: any;                              cek: any;          kunci: any;
  reviews: FirebaseListObservable<any>;  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
  afAuth: AngularFireAuth, public _app: App, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.nama = this.navParams.get('nama');
    this.key = this.navParams.get('$key');
    this.reviews = this.db.list('/reviews/' + this.key);
    const authObserver = afAuth.authState.subscribe(user => {
      if (!user) { 
        this._app.getRootNav().setRoot(LoginPage);
        authObserver.unsubscribe();
      } else {
        this.email = user.email;
        this.cek = this.reviews.subscribe(data => {
          data.forEach(element => {
            if(element.email == user.email){
              this.kunci = element.$key;
              console.log(this.kunci);
            }
          });
        }); 
        authObserver.unsubscribe();
      }
    });
  }

  //destroy all subscribe
  ngOnDestroy(){
    this.cek.unsubscribe();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Your Review',
      message: 'Are you sure to delete your review?',
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
            this.deleteRev();
          }
        }
      ]
    });
    confirm.present();
  }

  deleteRev(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.reviews.remove(this.kunci);
      loader.dismiss();
    });
  }

  toReview(){
    this.navCtrl.push(ReviewPage, this.key);
  }
}
