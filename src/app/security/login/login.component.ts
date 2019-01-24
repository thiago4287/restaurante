import { NotificationService } from './../../shared/message/notification.service';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'
import { User } from './user.model'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

user: User
  constructor(private fb: FormBuilder, 
    private loginService: LoginService, 
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  login(){
      this.loginService.login(this.loginForm.value.email, 
        this.loginForm.value.password)
        .subscribe(user => this.notificationService.notify(`Bem-vindo ${user.nome}`), 
        response => //HttpErrorResponse
        this.notificationService.notify(response.error.message))
  }

}
