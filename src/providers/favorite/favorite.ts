import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoriteProvider {
  
  favorite: Array<any> = [];
  wisata: FirebaseListObservable<any>;

  constructor(public afDatabase: AngularFireDatabase,
  private storage: Storage) {
    this.wisata = this.afDatabase.list('/wisata-alam');
  }

  addFavorite(index){
    this.storage.get('favorite').then(val => {
      this.wisata.subscribe(data => {
        let wisa = data.filter(item => {
          return item.$key.indexOf(index) > -1;
        });
        val.push(wisa[0]);
        this.storage.set('favorite', val);
        // console.log(wisa[0]);
      });
    });
  }

  removeFavorite(index){
    this.storage.get('favorite').then(val => {
      let cek = val.filter(item => {
        return item.nama.indexOf(index) > -1;
      });
      let rem = val.indexOf(cek[0]);
      val.splice(rem, 1);
      this.storage.set('favorite', val);
    });
  }
}
