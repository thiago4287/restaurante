import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1, 2, 3, 4, 5]

  rate: number = 0
  previewsRate: number

  @Output() rated = new EventEmitter<number>()
  constructor() { }

  ngOnInit() {
  }

  setRate(r: number){
    this.rate = r
    this.previewsRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(r: number) {
    if(this.previewsRate === undefined){
      this.previewsRate = this.rate
    }
    this.rate = r
  }

  clearTemporaryRate() {
    if(this.previewsRate !== undefined){
      this.rate = this.previewsRate
    }
    this.previewsRate === undefined
  }

}
