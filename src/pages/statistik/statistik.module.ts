import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatPage } from './statistik';

@NgModule({
  declarations: [
    StatPage,
  ],
  imports: [
    IonicPageModule.forChild(StatPage),
  ],
  exports: [
    StatPage
  ]
})
export class StatistikPageModule {}
