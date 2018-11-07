import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('entradaMenu', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(0 , -20px)'}),
      animate('500ms 0s ease-in')
    ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  entrada = 'ready'
  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  emitAddEvent(){
    //Quando o botão adicionar for clicado ele chamará esse méto que emitirá um evento
    //Esse evento passará o objeto menuItem
    // Quando esse componente for clicado, o componente parente será acionado e poderá
    //Realizar uma ação em cima desse evento 
    this.add.emit(this.menuItem)
  }
}
