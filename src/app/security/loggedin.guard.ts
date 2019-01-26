import { LoginService } from './login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string) {
        const loggedIn = this.loginService.isLoggedIn()//verifica se o usuário está logado
        //e retorna um valor booleano
        if(!loggedIn){
            this.loginService.handlerLogin(`/${path}`)
            // O parâmetro 'route.path' equivale ao elemento 'order' que será passado
            // para a rota
        }
        return loggedIn //Esse retorna vai permitir o carregamento da página ou não
        //dependendo do valor retornado(verdadeiro ou falso)
    }

    canLoad(route: Route): boolean {
        console.log("canLoad")
        return this.checkAuthentication(route.path)
        
        // Passa apenas o caminho da rota a ser guardada
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('canActivate')
        return this.checkAuthentication(activatedRoute.routeConfig.path)
        
    }
}

/* 
    Para verificar se um usuario está logado para poder usar essa rota guardada
    é necessário pegar o usuario logado através do LoginService.
    É feita a injeção desse service no construtor para ser utilizado no método
    canLoad

    Se o usuário não estiver logado ele é redirecionado para o pagina de login
    através do método handleLogin do LoginService

    O último passo é associar o LoginGuard q é um provider, à rota que queremos
    proteger, e isso é feito no arquivo de rotas 'app.routes' no path 'order'
*/