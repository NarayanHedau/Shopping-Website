import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 users:boolean=false
  constructor() { }

  ngOnInit(): void {
  }
 registration(){
  this.users=true
 }
 existing(){
  this.users=false
 }
}
