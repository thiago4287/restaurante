import { User } from './../../security/login/user.model';

import { LoginService } from './../../security/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.css']
})
export class UserDatailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginService.user
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  login() {
    this.loginService.handlerLogin()
  }

  logout(){
    this.loginService.logout()
  }

}
