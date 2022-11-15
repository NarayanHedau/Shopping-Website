import { MobileComponent } from './mobile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';

import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../shareModule/angular-material/angular-material.module';
import { CategoryComponent } from './category/category.component';
import { BuyMobilesComponent } from './buy-mobiles/buy-mobiles.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgImageSliderModule } from 'ng-image-slider';






@NgModule({
  declarations: [
  CategoryComponent,
  MobileComponent,
  BuyMobilesComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MobileRoutingModule,
    RouterModule,
    NgxImageZoomModule,
    NgImageSliderModule
    
    
    
  ]
})
export class MobileModule { }
