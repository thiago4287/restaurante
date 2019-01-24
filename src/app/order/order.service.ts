import { LoginService } from './../security/login/login.service';
import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-datail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-datail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService,
         private http: HttpClient,
         private loginService: LoginService){}

    itemsValue(): number {
        return this.cartService.total()
    }
    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }

    //FECHAMENTO DE COMPRA

    checkOrder(order: Order): Observable<string> {
        let headers  = new HttpHeaders()
        //Essa variável armazenará os dados do usuário logado vindo do backend(Autorization)
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
            //Esse headers é passado logo abaixo na requisição já com o token
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers:headers})
        .map(order => order.id)
    }
}