import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { Observable } from '../../node_modules/rxjs/Observable';

export class ErrorHandler {
    static handlerError(error: HttpErrorResponse | any) {
        let errorMessage: string;
        if(error instanceof HttpErrorResponse){
            const body = error.error
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText} || ''} ${body}`
        }else{
            errorMessage = error.toString()
        }
        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}