import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from '@angular/core';
import { NotificationService } from "app/shared/message/notification.service";

@Injectable()
export class ShoppingCartService {
    
    items: CartItem[] = []

    constructor(private notificationService: NotificationService) {}
    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }

        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem) {
        item.quantity = item.quantity - 1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number{
        return this.items
        .map(item => item.value())
        .reduce((prev, value)=> prev+value, 0)
    }

   
}


/* No método addItem, primeiro vamos verificar se o item clicado já 
 está no carrinho, caso já esteja, apenas incrementamos a quantidade do item
  ( O método find() faz uma varedura nos items do carrinho, cada item é passado
  como parâmetro pela função find, através da variável mItem e é comparado com
 o objeto passado no parâmetro do métodod addItem através dos respectivos 'ids')
caso não esteja, adicionamos um novo item 

No método removeItem é utilizado o método splice() o qual remove um elemento do 
array a partir do índice em que estou. Ele recebe como parâmetro o índice do 
elemento e um parâmetro númérico representando a quantidade de elementos que 
quero remover
*/