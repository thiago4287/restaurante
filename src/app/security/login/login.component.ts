import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  navigateTo: string

user: User
  constructor(private fb: FormBuilder, 
    private loginService: LoginService, 
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login(){
      this.loginService.login(this.loginForm.value.email, 
        this.loginForm.value.password)
        .subscribe(user => this.notificationService.notify(`Bem-vindo(a) ${user.nome}!`), 
        response => //HttpErrorResponse
        this.notificationService.notify(response.error.message), 
        ()=> {
          this.router.navigate([atob(this.navigateTo)])
          //A navegação já está pronta, agora precisamos passar o parâmetro para o 
          //método 'handlerLogin' no 'LoginService' saber para onde queremos ir
          //esse parâmetro será o 'path'
          // O método 'atob()' decodifica a informação
        })
  }

}
/**
 * Para enviar o parâmetro de redirecionamento de login para a rota é necessário
 * a utilização de um objeto 'ActivatedRoute' que é carregado no construtor e iniciado
 * no 'ngOnInit'.
 * No ngOnInit a variárivel navigateTo recebe o parâmetro de redirecionamento 'to' ou 
 * '/' se nenhum parâmeto for passado
 * 
 * Com o parâmtro carregado no 'navigateTo', agora é só passá-lo no através do metodo 
 * 'login()' e quem fará isso será uma função passada como callback dentro do subcribe 
 * através do método navigate do 'router'
 */