import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('entrada', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
      animate('500ms 0s ease-in-out')
    ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {
  
   @Input() restaurant: Restaurant
   estado ='ready'
   // O input é necessário para o component parent conseguir passar
   // um componente do tipo 'restaurante'
  constructor() { }

  ngOnInit() {
  }

}
