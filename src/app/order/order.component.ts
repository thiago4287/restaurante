import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-datail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { tap } from 'rxjs/operators'


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  delivery: number = 8

  orderId: string

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern =/^[0-9]*$/
  orderForm: FormGroup

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON'},
    {label: 'Cartão-débito', value:'DEB'},
    {label: 'Cartão-refeição', value:'REF'}
  ]
  constructor(private orderService: OrderService, private router: Router,
               private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation){
      return undefined
    }

    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch: true}
    }


    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }
  checkOrder(order: Order) {
    // Transformando os items do carrinho(CartItems) em OrderItem
    order.orderItems = this.cartItems().map(
      (item: CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary'])
        this.orderService.clear()
      })
  }

}
// o orderForm deve ser inicializado no método onInit(), ou seja, assim que aplicação carregar nossos serão renderizados

/* o método 'equalsTo() é um validator personalizado. Ele é estático e recebe um parâmetro group do tipo AbstractControl
  (que deve serimportado). Ele vai retornar um objeto no qual a chave ao ser recebida vai ser do tipo string e o retorno
  vai ser boolean. No nosso caso, esse validator fará a verificação dos emails dos nossso input.
  Os campos a serrem verificados serão duas constantes que receberão através do método 'get' do group, os campos do for-
  mulário a serem comparados(os nomes devem ser os mesmos que estão no formBuilder).
  O primeiro 'if' verifica se os atributos realmente existem no formulário, se não existrem o retorno será undefined,
  O segundo 'if' verifica se os campos são diferentes, caso sejam, uma variável é retornada com o valor: true. Essa var-
  riável será utilizada dentro do formulário para a validação. Caso seja iguais será retornado  'undefined', ou seja,
  não é necessário mostrar nehuma mensagem.
  O método é chamado dentro do formulário no 'onInit' por referência do componente entre chaves

*/