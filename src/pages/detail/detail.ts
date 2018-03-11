import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  param: any; lokasi:any;
  nama: any;
  cek: any;
  slide: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
  public favProvider: FavoriteProvider, public toastCtrl: ToastController, private socialSharing: SocialSharing,
  private iab: InAppBrowser) {
    
  }

  ionViewDidLoad() {
    this.slide = this.navParams.get('gambar');
    this.nama = this.navParams.get('nama');
    this.lokasi = this.navParams.get('lokasi');
    this.param =
      {
        key: this.navParams.get('$key'),
        nama: this.navParams.get('nama'),
        lokasi: this.navParams.get('lokasi'),
        lat: this.navParams.get('lat'),
        long: this.navParams.get('long'),
        link: this.navParams.get('link'),
        deskripsi: this.navParams.get('deskripsi'),
        youtube: this.navParams.get('youtube'),
        wisman: this.navParams.get('wisman'),
        wisnus: this.navParams.get('wisnus'),
        tahun: this.navParams.get('tahun')
      }
  }

  //update favorites list every enter the page
  ionViewWillEnter(){
    this.cekFavorite();
  }

  toInfo(){
    this.navCtrl.push('InfoPage', this.param);
  }

  share(){
    this.socialSharing.share("", this.nama, "", this.param.link).
    then(() => {
    // alert("Sharing success");
    // Success!
    }).catch(() => {
    // Error!
    alert("Share failed");
    });
  }

  presentToast(nama, msg) {
    let toast = this.toastCtrl.create({
      message: nama + ' ' + msg,
      duration: 3000
    });
    toast.present();
  }

  cekFavorite() {
    this.storage.get('favorite').then(val => {
      let cek = val.filter(item => {
        return item.nama.indexOf(this.param.nama) > -1;
      });
      this.cek = val.indexOf(cek[0]) > -1;
    });
  }

  //launching aplikasi google maps native
  toMap(){
    window.open('geo://?q=' + this.param.lat + ',' + this.param.long + '(' + this.param.nama + ')', '_system');
  }

  favorite(){
    this.cek = !this.cek;
    this.favProvider.addFavorite(this.param.key);
    this.presentToast(this.nama, ' have been added to favorites');
  }

  removeFavorite(){
    this.cek = !this.cek;
    this.favProvider.removeFavorite(this.param.nama);
    this.presentToast(this.nama, 'has been removed from favorites');
  }

  toWeb(){
    this.iab.create(this.param.link);
  }
}
