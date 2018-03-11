import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';

//deklarasi variable global google
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  public wisa: FirebaseListObservable<any[]>;
  private marker: Array<any>;
  public map: any;
  wisata: any;

  constructor(public db: AngularFireDatabase, private geolocation: Geolocation,
  public loadingCtrl: LoadingController) {
    //mengambil data dari firebase dimasukkan ke variabel wisa
    this.wisa = db.list('/wisata-alam');
    //menaruh wisa ke dalam array marker
    this.wisata = this.wisa.subscribe(keys => this.marker = keys);
  }

  ngOnDestroy() {
    this.wisata.unsubscribe();
  }

  ionViewDidEnter() {
    //inisialisasi map
    this.initMap();
  }

  //fungsi jika klik map maka info windows akan tertutup
  closeInfoWindows(infowindow){
    this.map.addListener('click', function(){
      infowindow.close();
    });
  }

  //menambah info windows pada setiap marker
  markerAddListener(marker, infowindow, contentString){
    marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open(this.map, marker);
    });
  }

  //fungsi inisialisasi map
  initMap() {
    let center = new google.maps.LatLng(-6.574939, 110.7744483);
    let mapOptions = {
      zoom: 10,
      center: center
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    let infowindow = new google.maps.InfoWindow();
    this.closeInfoWindows(infowindow);

    //fungsi loop untuk marker map dengan data dari firebase
    for(let i=0; i<this.marker.length; i++){
      let pin = new google.maps.LatLng(
        this.marker[i].lat,
        this.marker[i].long
      );
      
      let marker = new google.maps.Marker({
        position: pin
      });
      
      let contentString = this.marker[i].nama;

      //menambah marker ke dalam peta
      marker.setMap(this.map); 
      
      this.markerAddListener(marker, infowindow, contentString);
    }
  }

  //fungsi geolocation
  getCurrent(){

    let loader = this.loadingCtrl.create({
      content: "Find Your Location"
    });
    loader.present();

    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      let pos = new google.maps.LatLng(
        resp.coords.latitude, resp.coords.longitude
      );

      let infowindow = new google.maps.InfoWindow();
      this.closeInfoWindows(infowindow);

      let marker = new google.maps.Marker({
        position: pos,
        icon: 'assets/icon/marker2.png'
      })

      //mencegah marker lebih dari satu
      marker.setMap(null);
      //----------------------------------
      marker.setMap(this.map);

      let contentString = '<b>Your Location</b>';
      this.markerAddListener(marker, infowindow, contentString);

      this.map.setCenter(pos);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    loader.dismiss();
  }
}
