import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm: string;

  @Input() isDeviceXs: boolean;

  constructor() {}

  ngOnInit(): void {
    this.searchTerm = '';
  }

  searchMovie(): void {
    console.log(this.searchTerm);
  }
}
