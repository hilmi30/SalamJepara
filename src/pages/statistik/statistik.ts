import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-statistik',
  templateUrl: 'statistik.html',
})
export class StatPage {

  statistik: FirebaseListObservable<any>;
  tahun: FirebaseListObservable<any>;
  arrTahun: Array<any> = [];
  year: any;
  cek: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.statistik = db.list('/statistik');
    this.tahun = db.list('/tahun');
     this.cek = this.tahun.subscribe(data => {
     this.arrTahun = data;
      console.log(this.arrTahun[0].nama);
      this.year = this.arrTahun[0].nama;
    });
    // console.log(this.varTahun);
    // this.statistik.subscribe(data=>console.log(data));
  }

  ngOnDestroy(){
    this.cek.unsubscribe();
  }
  

}
