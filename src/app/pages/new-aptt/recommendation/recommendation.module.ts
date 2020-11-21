import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationPageRoutingModule } from './recommendation-routing.module';

import { RecommendationPage } from './recommendation.page';
import { PagesSharedModule } from '../../pages-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationPageRoutingModule,
    PagesSharedModule
  ],
  declarations: [RecommendationPage]
})
export class RecommendationPageModule {
}
