import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoviesPage } from './movies-page.model';
import { TmdbService } from './tmdb.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbStoreService {

    // tslint:disable-next-line:variable-name
    private readonly _movies = new BehaviorSubject<MoviesPage>(new MoviesPage());

    readonly movies$ = this._movies.asObservable();

    get movies(): MoviesPage {
      return this._movies.getValue();
    }

    set movies(val: MoviesPage) {
      this._movies.next(val);
    }

  constructor(private tmdbService: TmdbService) {
    this.fetchPopularMovies();
  }

  async fetchPopularMovies(): Promise<any> {
  await this.tmdbService.fetchPopularMovies().toPromise()
    .then(promisedMovies => {
      this.movies = promisedMovies;
    })
    .catch((error: any) => {
      console.log(error);
    });
  }

  async searchMovie(query: string): Promise<any> {
    if (query.trim() === '') {
      await this.fetchPopularMovies();
      return;
    }

    await this.tmdbService.searchMovie(query).toPromise()
    .then(promisedMovies => {
      this.movies = promisedMovies;
    })
    .catch((error: any) => {
      console.log(error);
    });
  }
}
