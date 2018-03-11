import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { FavoritPage } from '../favorit/favorit';
import { MapPage } from '../map/map';
import { StatPage } from '../statistik/statistik';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = FavoritPage;
  tab4Root = StatPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
