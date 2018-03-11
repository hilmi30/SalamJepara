import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  nama:any; map: any; deskripsi: any; lokasi:any; wisman: any; wisnus: any; tahun: any; jumlah:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
  public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    this.nama = this.navParams.get('nama');
    this.deskripsi = this.navParams.get('deskripsi');
    this.lokasi = this.navParams.get('lokasi');
    this.wisman = this.navParams.get('wisman');
    this.wisnus = this.navParams.get('wisnus');
    this.tahun = this.navParams.get('tahun');
    this.jumlah = this.wisman + this.wisnus;
    this.initMap();
  }

  markerAddListener(marker, infowindow, contentString){
    marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open(this.map, marker);
    });
  }

  closeInfoWindows(infowindow){
    this.map.addListener('click', function(){
      infowindow.close();
    });
  }

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

  initMap(){
    let lat = this.navParams.get('lat');
    let long = this.navParams.get('long');
    let center = new google.maps.LatLng(lat, long);
    let mapOptions = {
      zoom: 10,
      center: center
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
      position: center
    }); 
    
    let contentString = this.nama;

    //menambah marker ke dalam peta
    marker.setMap(this.map); 
    
    this.markerAddListener(marker, infowindow, contentString);
  }

}
