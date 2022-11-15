import { MobileComponent } from './mobile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';

import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../shareModule/angular-material/angular-material.module';
import { CategoryComponent } from './category/category.component';






@NgModule({
  declarations: [
  CategoryComponent,
  MobileComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MobileRoutingModule,
    RouterModule

  ]
})
export class MobileModule { }
