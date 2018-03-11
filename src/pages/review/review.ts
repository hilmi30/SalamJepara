import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
// import { AllReviewsPage } from '../all-reviews/all-reviews';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  user: FirebaseListObservable<any>;
  key: any;
  review: any;      email: any;   date: any;
  username: any;    name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase,
  afAuth: AngularFireAuth, public loading: LoadingController, public alertCtrl: AlertController,
  public _app: App) {
    this.date = new Date().toDateString();
    this.key = this.navParams.data;
    this.user = db.list('/userProfile');
    const authObserver = afAuth.authState.subscribe(user => {
      if (!user) { 
        this._app.getRootNav().setRoot(LoginPage);
        authObserver.unsubscribe();
      } else {
        // console.log(user.email);
         this.name = this.user.subscribe(data => {
          data.forEach(element => {
            if(element.email == user.email){
              this.username = element.username;
              this.email = element.email;
            }
          });
        });
        authObserver.unsubscribe();
      }
    });
  }

  ngOnDestroy(){
    this.name.unsubscribe();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Review Success',
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Add Your Review',
      message: 'Are you sure to add your review?',
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
            this.addReviews();
          }
        }
      ]
    });
    confirm.present();
  }

  addReviews(){
    console.log(this.date);
    let loader = this.loading.create({
      content: 'Please Wait'
    });
    loader.present().then(() => {
      this.db.object(`/reviews/${this.key}/${this.username}`).set({
          review: this.review,
          username: this.username,
          email: this.email,
          date: this.date
      });
      loader.dismiss();
      this.showAlert();
      this.review = "";
    })
  }

}
