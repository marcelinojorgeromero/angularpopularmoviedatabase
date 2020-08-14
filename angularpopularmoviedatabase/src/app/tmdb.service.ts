import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesPage } from './movies-page.model';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private tmdbApiKey = '9198fa6d9a9713bc6b03ee9582525917';
  private tmdbBaseUrl = 'https://api.themoviedb.org/3/';
  private tmdbPopularMoviesUrl = this.tmdbBaseUrl + 'discover/movie?api_key=' + this.tmdbApiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
  private tmdbPosterPath = 'http://image.tmdb.org/t/p/w185/';
  private tmdbSearchMovieUrl = this.tmdbBaseUrl + 'search/movie?api_key=' + this.tmdbApiKey + '&language=en-US&page=1&include_adult=false&query=';

  constructor(private http: HttpClient) { }

  private getPosterPath(posterId: string): string {
    return this.tmdbPosterPath + posterId;
  }

  private constructHeaders(): HttpHeaders {
    return new HttpHeaders({
      accept: 'application/json, text/plain, */*',
      'accept-language': 'es-CL,es-419;q=0.9,es;q=0.8,en-US;q=0.7,en;q=0.6,el;q=0.5',
      'Content-type': 'application/json; charset=utf-8'
    });
  }

  fetchPopularMovies(): Observable<MoviesPage> {
    const httpHeaders = this.constructHeaders();
    const result = this.http.get(this.tmdbPopularMoviesUrl, {headers: httpHeaders})
    .pipe(map((resp: any) => {
      const moviesPage = new MoviesPage();
      moviesPage.results = [];
      moviesPage.page = resp.page;
      moviesPage.totalPages = resp.total_pages;
      moviesPage.totalResults = resp.total_results;
      resp.results.forEach(item => {
        const movie = new Movie();
        movie.adult = item.adult;
        movie.backdropPath = item.backdrop_path;
        movie.originalTitle = item.original_title;
        movie.overview = item.overview;
        movie.voteCount = item.vote_count;
        movie.title = item.title;
        movie.id = item.id;
        movie.voteAverage = item.vote_average;
        movie.posterPath = item.poster_path;
        movie.fullPosterPath = this.getPosterPath(item.poster_path);
        movie.releaseDate = item.release_date;
        moviesPage.results.push(movie);
      });
      return moviesPage;
    }));
    return result;
    // .subscribe((resp: any) => {
    //   const moviesPage = new MoviesPage();
    //   moviesPage.results = [];
    //   moviesPage.page = resp.page;
    //   moviesPage.totalPages = resp.total_pages;
    //   moviesPage.totalResults = resp.total_results;
    //   resp.results.forEach(item => {
    //     const movie = new Movie();
    //     movie.adult = item.adult;
    //     movie.backdropPath = item.backdrop_path;
    //     movie.originalTitle = item.original_title;
    //     movie.overview = item.overview;
    //     movie.voteCount = item.vote_count;
    //     movie.title = item.title;
    //     movie.id = item.id;
    //     movie.voteAverage = item.vote_average;
    //     movie.posterPath = item.poster_path;
    //     movie.fullPosterPath = this.getPosterPath(item.poster_path);
    //     movie.releaseDate = item.release_date;
    //     moviesPage.results.push(movie);
    //   });
    //   this._movies.next(moviesPage);
    // });

  }

  searchMovie(query: string): Observable<MoviesPage> {
    const httpHeaders = this.constructHeaders();
    const result = this.http.get(this.tmdbSearchMovieUrl + query, {headers: httpHeaders})
    .pipe(map((resp: any) => {
      const moviesPage = new MoviesPage();
      moviesPage.results = [];
      moviesPage.page = resp.page;
      moviesPage.totalPages = resp.total_pages;
      moviesPage.totalResults = resp.total_results;
      resp.results.forEach(item => {
        const movie = new Movie();
        movie.adult = item.adult;
        movie.backdropPath = item.backdrop_path;
        movie.originalTitle = item.original_title;
        movie.overview = item.overview;
        movie.voteCount = item.vote_count;
        movie.title = item.title;
        movie.id = item.id;
        movie.voteAverage = item.vote_average;
        movie.posterPath = item.poster_path;
        movie.fullPosterPath = this.getPosterPath(item.poster_path);
        movie.releaseDate = item.release_date;
        moviesPage.results.push(movie);
      });
      return moviesPage;
    }));
    return result;
  }
}

// export class ModelMapper<T> {
//   private propertyMapping: any;
//   private target: any;

//   constructor(type: new() => T ){
//     this.target = new type();
//     this.propertyMapping = this.target.constructor._propertyMap;
//   }

//   map(source): any {
//     Object.keys(this.target).forEach((key) => {
//       const mappedKey = this.propertyMapping[key];
//       this.target[key] = mappedKey ? source[mappedKey] : source[key];
//     });
//     Object.keys(source).forEach((key) => {
//       const targetKeys = Object.keys(this.target);
//       if (targetKeys.indexOf(key) === -1){
//         this.target[key] = source[key];
//       }
//     });
//     return this.target;
//   }
// }
