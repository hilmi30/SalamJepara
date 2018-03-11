import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritPage } from './favorit';

@NgModule({
  declarations: [
    FavoritPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritPage),
  ],
  exports: [
    FavoritPage
  ]
})
export class FavoritModule {}
