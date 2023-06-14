import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/service/movie-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categoriesData: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMoviesByCategories();
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

  getMoviesByCategories() {
    const categories = ['popular', 'top_rated', 'upcoming'];
    for (const category of categories) {
      this.subscription.add(
        this.movieService.getMoviesByCategory(category).subscribe(
          (data: any) => {
            this.categoriesData.push({
              category: category,
              movies: data.results,
            });
          },
          (error) => {
            console.log(
              "Une erreur s'est produite lors de la récupération des films :",
              error
            );
          }
        )
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
