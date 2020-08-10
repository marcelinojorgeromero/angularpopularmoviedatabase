import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      'Access-Control-Allow-Origin': '*',
      'access-control-allow-origin': '*',
      'content-type': 'application/json;charset=utf-8',
      'Content-type': 'application/json; charset=utf-8'
    });
  }

  getPopularMovies(): Observable<MoviesPage> {
    const httpHeaders = this.constructHeaders();

    const result = this.http.get(this.tmdbPopularMoviesUrl, {headers: httpHeaders}).pipe(map((resp: any) => {
      const moviesPage = new MoviesPage();
      moviesPage.results = [];
      moviesPage.page = resp.page;
      moviesPage.totalPages = resp.total_pages;
      moviesPage.totalResults = resp.total_results;
      // moviesPage.results = (new ModelMapper(Movie)).map(resp.results);
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

  searchMovie(query: string): Observable<MoviesPage> {
    const httpHeaders = this.constructHeaders();

    const result = this.http.get(this.tmdbSearchMovieUrl + query, {headers: httpHeaders}).pipe(map((resp: any) => {
      const moviesPage = new MoviesPage();
      moviesPage.results = [];
      moviesPage.page = resp.page;
      moviesPage.totalPages = resp.total_pages;
      moviesPage.totalResults = resp.total_results;
      // moviesPage.results = (new ModelMapper(Movie)).map(resp.results);
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

export class MoviesPage {
  page: number;

  @propertyMap('total_results')
  totalResults: number;

  @propertyMap('total_pages')
  totalPages: number;

  @propertyMap('results')
  results: Movie[];
}

export class Movie {
  popularity: number;

  @propertyMap('vote_count')
  voteCount: number;
  video: boolean;

  @propertyMap('poster_path')
  posterPath: string;
  id: number;
  adult: boolean;

  @propertyMap('backdrop_path')
  backdropPath: string;

  @propertyMap('original_language')
  originalLanguage: string;

  @propertyMap('original_title')
  originalTitle: string;

  @propertyMap('genre_ids')
  genreIds: [];
  title: string;

  @propertyMap('vote_average')
  voteAverage: number;
  overview: string;

  @propertyMap('release_date')
  releaseDate: Date;

  fullPosterPath: string;
}

export function propertyMap(sourceProperty: string): any {
  return (target: any, propertyKey: string): any => {
    if (!target.constructor._propertyMap){
      target.constructor._propertyMap = {};
    }
    target.constructor._propertyMap[propertyKey] = sourceProperty;
  };
}

export class ModelMapper<T> {
  private propertyMapping: any;
  private target: any;

  constructor(type: new() => T ){
    this.target = new type();
    this.propertyMapping = this.target.constructor._propertyMap;
  }

  map(source): any {
    Object.keys(this.target).forEach((key) => {
      const mappedKey = this.propertyMapping[key];
      this.target[key] = mappedKey ? source[mappedKey] : source[key];
    });
    Object.keys(source).forEach((key) => {
      const targetKeys = Object.keys(this.target);
      if (targetKeys.indexOf(key) === -1){
        this.target[key] = source[key];
      }
    });
    return this.target;
  }
}

