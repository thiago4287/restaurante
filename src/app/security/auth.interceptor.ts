import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){}//No lugar do 'LoginService'
    //utiliza-se o Injector. Só assim conseguimos pegar uma referência do token

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)//Aqui pegamos a referência
        
        if(loginService.isLoggedIn()){
            
            const authRequest = request.clone(
                {setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
                return next.handle(authRequest)
        }else {
            return next.handle(request)
        }
        

        /**
 * Código antigo que estava no OrderService
 * let headers  = new HttpHeaders()
        //Essa variável armazenará os dados do usuário logado vindo do backend(Autorization)
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
            //Esse headers é passado logo abaixo na requisição já com o token
 */
    }
}



/**
 * Injector é um mecanismo para injeção de dependência do Angular
 * Através do Injector podemos ter a referência de qualquer objeto que estiver registrado
 * dentro do conteiner de injeção de dependência. Dessa forma podemos obter uma 
 * instância e as dependências da mesma de qualquer componente registrado como se 
 * estivéssemos injetando essa instância no construtor da classe que vai utilizá-lo
 * 
 * Como o objeto 'request' é imutável, não conseguiremos modificálo diretamente. Então 
 * para utilizá-lo aqui teremos que cloná-lo para deixá-lo disponível para uso
 */