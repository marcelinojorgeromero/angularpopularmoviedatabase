import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { TmdbService, MoviesPage, Movie } from '../tmdb.service';
import { Subscription } from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ TmdbService ]
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() isDeviceXs: boolean;
  topVal = 0;
  @Output() movies: MoviesPage;
  selectedMovie: Movie;
  moviesSubscription: Subscription;
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 20;
  pageEvent: PageEvent;

  constructor(private tmdbService: TmdbService) {
    this.movies = new MoviesPage();
    this.selectedMovie = new Movie();
  }

  ngOnInit(): void {
    const observable = this.tmdbService.getPopularMovies();
    this.moviesSubscription = observable.subscribe(movie => {
      this.movies = movie;
      this.currentPage = movie.page;
      this.totalPages = movie.totalPages;
      console.log(movie);
    });
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  showMovieInfo(movie: Movie): void {
    this.selectedMovie = movie;
  }

  onScroll(e): void {
    const scrollXs = this.isDeviceXs ? 55 : 73;
    this.topVal = e.srcElement.scrollTop < scrollXs ? e.srcElement.scrollTop : scrollXs;
  }
  sideBarScroll(): number {
    const e = this.isDeviceXs ? 160 : 130;
    return e - this.topVal;
  }
}
