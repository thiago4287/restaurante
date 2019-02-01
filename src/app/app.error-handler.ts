import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/message/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
//import { throwError } from 'rxjs/operators'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
     
    constructor(private ns: NotificationService,
        private injector: Injector,
        private zone: NgZone){
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
         //const message = errorResponse.error.message
         const message = errorResponse.message;
         
         console.log('Mesagem: ', message)

         if(errorResponse instanceof HttpErrorResponse){
            
            this.zone.run(()=> {

                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handlerLogin()
                    break;
    
                    case 403:
                        this.ns.notify(message || 'Não autorizado!')
                    break;
    
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes!')
                    break;
                }
            })
            
        }
       super.handleError(errorResponse)
        }
    
}

/**
 *  O 'NgZone' executa o código dentro de uma zona, dessa forma o código é atuaoizado
 * automaticamente pelo angular e assim ele consegue perceber es o código ainda está
 * sendo executado ou já terminou
 */