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

  // Méthode pour obtenir les détails d'un film par son ID
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
  // Méthode pour obtenir les vidéos d'un film par son ID
  getMovieVideo(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  // Méthode pour obtenir les images d'un film par son ID
  getMovieImages(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/images?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  // Méthode pour obtenir les acteurs d'un film par son ID
  getMovieCredits(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  // Méthode pour rechercher des films par mots-clés
  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }

  // Méthode pour obtenir les films populaires
  getPopularMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  // Méthode pour obtenir les films les mieux notés
  getTopRatedMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  // Méthode pour obtenir les films à venir
  getUpcomingMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviesByCategory(category: string) {
    const url = `${this.baseUrl}/movie/${category}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getMoviesByMultipleCategories(categories: string[]) {
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
