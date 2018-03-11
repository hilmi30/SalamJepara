import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

declare var google;

@IonicPage()
@Component({
  selector: 'page-favorit',
  templateUrl: 'favorit.html',
})
export class FavoritPage {

  favWis: Array<any> = new Array;

  constructor(public navCtrl: NavController, private storage: Storage) {
    // this.getFavorite();
  }

  toDetail(wisata){
    // console.log('detail');
    this.navCtrl.push(DetailPage, wisata);
  }

  getFavorite(){
    this.storage.get('favorite').then(val => {     
      this.favWis = val;
      // console.log(val);
    });
  }

  ionViewDidEnter(){
    this.getFavorite();
  }
}
