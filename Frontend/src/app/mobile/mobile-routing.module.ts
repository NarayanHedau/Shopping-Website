import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';

import { MobileComponent } from './mobile.component';

const routes: Routes = [
  {path:"",component:MobileComponent},
    {path:"mobile-type",component:CategoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MobileRoutingModule { }
