import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm: string;

  @Input() isDeviceXs: boolean;
  @Input() title: string;
  @Output() searchMovieQuery = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.searchTerm = '';
  }
}
