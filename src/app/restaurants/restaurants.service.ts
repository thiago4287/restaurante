import { Restaurant } from "./restaurant/restaurant.model";
import { MEAT_API } from '../app.api';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Review } from "../restaurant-datail/reviews/review.model";
import { MenuItem } from '../restaurant-datail/menu-item/menu-item.model';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestaurantService{
    // Injetando o serviço http no construtor
    constructor(private http: HttpClient){}

    // Utilizando o http injetado para fazer um arequisição get
    // para buscar e  devolver uma lista devolver uma lista de restaurantes
    restaurants(search?: string): Observable<Restaurant[]> {
    // Esse método retorna um 'Observable' onde o tipo é um array de Restaurants
    // Como a resposta do 'http'(response) retornado é um arquivo cru, com
    // todos os dados http, como status, etc, então ele não é aceito como um
    // uma resposta válida para o array de restaurantes passado no Observable
    // Entaõ temos que mapear a resposta e extrair apenas o conteúso 'json'
    // e isso é feito com o operador 'map' da biblioteca 'rxjs' 

        let parametro: HttpParams = undefined
        if(search){
            parametro = new HttpParams().append('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: parametro})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

   /* reviewsOfRestaurantP(id: string): Observable<Review>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .map(response => response.json)
        .catch(ErrorHandler.handlerError);
        
    }*/

    reviews(id: string): Observable<Review[]> {
        // Esse método retorna um 'Observable' onde o tipo é um array de Restaurants
        // Como a resposta do 'http'(response) retornado é um arquivo cru, com
        // todos os dados http, como status, etc, então ele não é aceito como um
        // uma resposta válida para o array de restaurantes passado no Observable
        // Entaõ temos que mapear a resposta e extrair apenas o conteúso 'json'
        // e isso é feito com o operador 'map' da biblioteca 'rxjs' 
            return this.http.get<Review[]>(`${MEAT_API}/restaurants/${id}/reviews`)
        }

        menuOfRestaurant(id: string): Observable<MenuItem[]>{  
            return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
        }
}