import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { MoviesPage } from '../movies-page.model';
import { Movie } from '../movie.model';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() isDeviceXs: boolean;
  @Input() moviesPage: MoviesPage;
  selectedMovie: Movie;
  topVal = 0;

  constructor() {
    this.selectedMovie = new Movie();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  showMovieInfo(movie: Movie): void {
    this.selectedMovie = movie;
  }

  sideBarScroll(): number {
    const e = this.isDeviceXs ? 160 : 130;
    return e - this.topVal;
  }

  onScroll(e): void {
    const scrollXs = this.isDeviceXs ? 55 : 73;
    this.topVal = e.srcElement.scrollTop < scrollXs ? e.srcElement.scrollTop : scrollXs;
  }
}
