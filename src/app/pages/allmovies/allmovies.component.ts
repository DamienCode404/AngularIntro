import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieService } from 'src/app/service/movie-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allmovies',
  templateUrl: './allmovies.component.html',
  styleUrls: ['./allmovies.component.css'],
})
export class AllmoviesComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  allMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getAllMovies();
  }

  getMoviePosterUrl(posterPath: string): string {
    const basePosterUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'w500'; // Choisir la taille appropriée pour l'affiche

    if (posterPath) {
      return basePosterUrl + posterSize + posterPath;
    } else {
      // Retourner une URL par défaut ou une image de remplacement si nécessaire
      return 'URL de remplacement ou une URL par défaut';
    }
  }

  getAllMovies() {
    this.subscription.add(
      this.movieService.getAllMovies(this.currentPage).subscribe(
        (data: any) => {
          this.movies = data.results;
          this.totalPages = data.total_pages;
          this.allMovies = this.allMovies.concat(this.movies);
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des données :",
            error
          );
        }
      )
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllMovies();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllMovies();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
