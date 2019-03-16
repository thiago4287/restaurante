import { AuthInterceptor } from './../security/auth.interceptor';
import { LeaveOrderGuard } from './../order/leave-order-guard';
import { LoggedInGuard } from './../security/loggedin.guard';
import { LoginService } from './../security/login/login.service';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RestaurantService } from "../restaurants/restaurants.service";
import { ShoppingCartService } from "../restaurant-datail/shopping-cart/shopping-cart.service";
import { OrderService } from "../order/order.service";
import { SnackbarComponent } from './message/snackbar/snackbar.component';
import { NotificationService } from "./message/notification.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent,CommonModule,
    FormsModule, ReactiveFormsModule, SnackbarComponent]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [RestaurantService, ShoppingCartService, 
                OrderService, NotificationService, LoginService,
            LoggedInGuard, LeaveOrderGuard,
            {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
        }
    }
}

/* Como este módulo é um múdlo filho, precisamos importar o CommonsModule,
 no módulo raiz não precisa pois o BrowserModule já faz essa implementação

 Precisamos 'declarar' os componentes que usarão este múdulo
 'importar' os módulos que serão utilizados ou estão sendo utilizados pelos componentes
 e 'exportar' os componentes que serão usados em outros módulos.
 podemos também exportar nesse módulo, módulos extras como: CommonsModule, FormsModule e outros,
 dessa forma os módulos que implementares este módulo compartilhado não precisará mais
 importá-los.

 O método estático forRoot() o core module criado anteriormente com os providers dos serviços
 Dessa forma, ao passar o sharedModule para o módulo raiz, ao inves de carregá-lo apenas 
 o módulo diretamente, podemos carregar o módulo com a função forRoot(), dessa forma passando
 também os providers dos services, ao contrário dos outros módulos que carregam apenas o módulo
 
  */ 