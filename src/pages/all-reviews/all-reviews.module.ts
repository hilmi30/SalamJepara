import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllReviewsPage } from './all-reviews';

@NgModule({
  declarations: [
    AllReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllReviewsPage),
  ],
  exports: [
    AllReviewsPage
  ]
})
export class AllReviewsPageModule {}
