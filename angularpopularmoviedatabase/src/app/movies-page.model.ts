import { Movie } from './movie.model';

export class MoviesPage {
  page: number;

  totalResults: number;

  totalPages: number;

  results: Movie[];
}
