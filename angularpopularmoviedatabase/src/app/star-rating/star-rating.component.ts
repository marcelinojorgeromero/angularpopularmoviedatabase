import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() starscount: number;
  @Input() selectedValue: number;

  constructor() { this.selectedValue = -1; }

  ngOnInit(): void { }

  countStar(star): void {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
}
