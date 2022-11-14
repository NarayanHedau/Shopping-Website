import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"home",component:HomeComponent},
  {path:"auth",loadChildren:() => import('./auth/auth.module').then((m)=>m.AuthModule)},
  {path:"mobile-store",loadChildren:()=>import('./mobile/mobile.module').then((m)=>m.MobileModule)}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
