import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurants/restaurants.service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Review } from './review.model';
@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
    
  reviews: Review[]
  constructor(private restaurantService: RestaurantService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // Como na chamada do template estamos utilizado o pipe async, não é necessário
    // chamar o subscribe aqui, o próprio pipe o chama
      this.restaurantService
    .reviews(this.route.parent.snapshot.params['id'])
    .subscribe(reviews => this.reviews = reviews);
  
  }

}
