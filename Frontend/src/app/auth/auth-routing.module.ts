import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {path:'' ,redirectTo:'/login', pathMatch:'full'},
  {path:"login",component:LoginComponent},

  {path:"my-account",component:MyAccountComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
