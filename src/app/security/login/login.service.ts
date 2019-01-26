import { Router, NavigationEnd } from '@angular/router';
import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'

import { User } from './user.model'
@Injectable()
export class LoginService {

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
        this.router.events.filter(e=> e instanceof NavigationEnd)
        .subscribe((e: NavigationEnd)=> this.lastUrl = e.url)
    }

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, 
        {email: email, password: password})
        .do(user => this.user = user)
    }

    handlerLogin(path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(path)])
    //O método 'btoa()' codifica a informação
    }

    logout() {
        this.user = undefined
    }
}

/*
    Como iremos precisar redirecionar o usuário para a página de login, precisaremos
    importar o 'Router' e criar uma referência no construtor para utilizá-lo
*/