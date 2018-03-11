import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DetailPage } from '../detail/detail';
import { AllReviewsPage } from '../all-reviews/all-reviews';
import { Geolocation } from '@ionic-native/geolocation';
import { DistanceProvider } from '../../providers/distance/distance';
import { SocialSharing } from '@ionic-native/social-sharing';

//deklarasi variable global google
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  wisa: FirebaseListObservable<any[]>; checkNama: boolean;      jarak: Array<any> = [];
  wis: Array<any>;                     checkJarak: boolean;     length: any;
  paramSearch: boolean;                sort: string;            loader: any;
  search: string;                      searching: boolean;      wisata: any;
  map: any;                            userProvider: any;       watch: any;
  profile: FirebaseListObservable<any[]>; profileArr: Array<any>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public loadingCtrl: LoadingController,
  public alertCtrl: AlertController, private geolocation: Geolocation,
  public toastCtrl: ToastController, private socialSharing: SocialSharing,
  public distanceProvider: DistanceProvider) {
    this.loader = this.loadingCtrl.create({
      content: "Loading Data"
    });
    this.sort = 'nama';
    this.paramSearch = false;
    this.searching = false;
    this.checkNama = true;
    this.loadWisata();
  }

  //destroy all subscribes
  ngOnDestroy() {
    this.wisata.unsubscribe();
    this.watch.unsubscribe();
  }

  toReview(wisata){
    this.navCtrl.push(AllReviewsPage, wisata);
  }

  share(wisataKey){
    this.wis.forEach((data) => {
      if(wisataKey == data.$key){
        this.socialSharing.share("", data.nama, "", data.link).
        then(() => {
        // alert("Sharing success");
        // Success!
        }).catch(() => {
        // Error!
        alert("Share failed");
        });
      }
    });
  }

  //launching aplikasi google maps native
  toMap(nama, lat, long){
    // console.log('map');
    window.open('geo://?q=' + lat + ',' + long + '(' + nama + ')', '_system');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Location not found!',
      subTitle: 'The location you are looking for is not found, please check your keywords',
      buttons: ['OK']
    });
    alert.present();
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Settings');

    alert.addInput({
      type: 'radio',
      label: 'Sort by name',
      value: 'nama',
      checked: this.checkNama
    });

    alert.addInput({
      type: 'radio',
      label: 'Sort by distance',
      value: 'jarak',
      checked: this.checkJarak
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == 'nama'){
          this.checkJarak = false;
          this.checkNama = true;
          this.setWisatatoArray();
        } else {
          this.checkJarak = true;
          this.checkNama = false;
          this.sortJarak();
        }
        
        // this.loadWisata();
      }
    });
    alert.present();
  }

  toDetail(wisata){
    // console.log('detail');
    this.navCtrl.push(DetailPage, wisata);
  }

  setWisataAlam(){
    this.wisa = this.db.list('/wisata-alam');
  }

  loadWisata() {
    this.loader.present().then((data) => {
      // console.log(data);
      this.setWisataAlam();
      this.setWisatatoArray();
      this.watchGeo();
      this.loader.dismiss();
    });
  }

  getItems(ev) {
    // console.log(this.wis);
    let loader = this.loadingCtrl.create({
      content: "Find Your Location"
    });
    loader.present();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.wis = this.wis.filter((item) => {
        return item.nama.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
      if (this.wis.length == 0){
        this.showAlert();
        this.setWisatatoArray();
        this.searching = false;
      } else {
        this.searching = true;
      }
    } else {
       this.setWisatatoArray();
    }
    
    loader.dismiss();
    this.falseParam();
  }

  setWisatatoArray(){
    this.wisata = this.wisa.subscribe(keys => {this.wis = keys; this.length = keys.length});
  }

  trueParam(){
    this.paramSearch = true;
  }

  falseParam(){
    this.paramSearch = false;
    this.search = '';
  }

  sortJarak(){
    this.wis.sort(function (a, b) {
      return a.jarak - b.jarak;
    });
    // console.log(this.wis);
  }

  backAll(){
    this.searching = false;
    // this.loader.present();
    this.setWisatatoArray();
    // this.loader.dismiss();
    this.falseParam();
  }

  watchGeo(){
    let options = {enableHighAccuracy: true}
    this.watch = this.geolocation.watchPosition(options)
    .subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
     if(this.wis == null){
      console.log("null");
      // this.loader.present();
     } else {
      //  this.loader.present();
      //  console.log("Array Loaded");
       let start = {
          lat: data.coords.latitude,
          lng: data.coords.longitude
        };
        this.wis.forEach((wisata) => {
          // console.log(index);
          let end = {
            lat: wisata.lat,
            lng: wisata.long
          };
          let distance = this.distanceProvider.distance(start, end, "km");
          let jarakInt = parseInt(distance);
          wisata.jarak = jarakInt;

        });
        // console.log(this.wis);
        // this.loader.dismiss();
        
     }
    });
  }
}
