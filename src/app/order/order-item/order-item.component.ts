import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-datail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-item',
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent implements OnInit {

  @Input() items: CartItem[];
  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseItem(item: CartItem){
      this.increaseQty.emit(item)
      console.log(item)
  }

  emitDecreaseItem(item: CartItem){
    this.decreaseQty.emit(item)
}

emitRemove(item: CartItem){
  this.remove.emit(item)
}

}
