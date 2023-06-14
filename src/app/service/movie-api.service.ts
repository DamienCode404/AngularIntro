import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '2de64c25480eaaa876cfb4974b7d5b6a';

  constructor(private http: HttpClient) {}

  getMoviesByCategory(category: string) {
    const url = `${this.baseUrl}/movie/${category}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviesByCategories(categories: string[]) {
    const moviesByCategories: Observable<any>[] = [];

    for (const category of categories) {
      const movies$ = this.getMoviesByCategory(category).pipe(
        map((data: any) => ({
          category: category,
          movies: data.results.slice(0, 6), // Récupère les 6 premiers films
        }))
      );
      moviesByCategories.push(movies$);
    }

    return forkJoin(moviesByCategories);
  }
}
