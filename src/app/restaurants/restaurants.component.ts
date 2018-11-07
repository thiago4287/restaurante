import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder,  FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('barraBusca', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      //transition("* => *", animate("250ms 0 ease-in-out"))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
    restaurants: Restaurant[] 
    estadoBarra = 'hidden'

    searchForm: FormGroup
    searchControl: FormControl //Para ficar ouvindo os valores digitados na barra
    // Uma instância de RestauranteService é injetada no construtor
  constructor(private restauranteService: RestaurantService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(TextoDigitado => 
      this.restauranteService.restaurants(TextoDigitado)
      .catch(error=> Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    /*
    O swicthMap acima intercala 2 ou mais observalbes, logo substitui os códigos abaixo
    ####################################################################################
    this.searchControl.valueChanges.subscribe(TextoPesquisa => console.log(TextoPesquisa))
    ######################################################################################*/

    // O array 'restaurants' é inicializado com os dados do 'service'
    /*#################################################################
    this.restaurants = this.restauranteService.restaurants()
    ###################################################################
    */

    // Utilizando os dados vindo do da requisição:

    
    this.restauranteService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants)
    

    // Através do subscribe(método Listener) eu consigo acessar os dados vindos do Observable
    //do service e transferí-los para o array do componente
  }

  mostraBarra(){
    this.estadoBarra = this.estadoBarra === 'hidden' ? 'visible' : 'hidden'
  }
  // Obs: para o Angular conseguir enxergar o RestauranteService como o serviço que
  // está provendo os dados para o array de restaurantes é necessário declará-lo 
  // na lista de providers do módulo principal

  
}
