import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movieId: number | null = null;
  movieDetails: any;
  videoDetails: any;
  videos: any[] = [];
  cast: any[] = [];
  crew: any[] = [];
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const movieIdParam = params.get('id');
      if (movieIdParam) {
        this.movieId = +movieIdParam;
        this.getMovieDetails();
        this.getMovieVideo();
        this.getMovieCredits();
        this.getMovieImages();
      }
    });
  }

  getMovieDetails() {
    if (this.movieId) {
      this.movieService.getMovieDetails(this.movieId).subscribe(
        (data) => {
          this.movieDetails = data;
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des détails du film :",
            error
          );
        }
      );
    }
  }

  getMovieVideo() {
    if (this.movieId) {
      this.movieService.getMovieVideo(this.movieId).subscribe(
        (data) => {
          this.videoDetails = data.results;
          this.videos = this.videoDetails; // Mettre à jour le tableau videos avec les données récupérées
          console.log('Videos:', this.videos);
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération de la vidéo du film :",
            error
          );
        }
      );
    }
  }

  getMovieCredits() {
    if (this.movieId) {
      this.movieService.getMovieCredits(this.movieId).subscribe(
        (data) => {
          this.cast = data.cast;
          this.crew = data.crew;
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des crédits du film :",
            error
          );
        }
      );
    }
  }

  getMovieImages() {
    if (this.movieId) {
      this.movieService.getMovieImages(this.movieId).subscribe(
        (data) => {
          this.images = data.backdrops;
        },
        (error) => {
          console.log(
            "Une erreur s'est produite lors de la récupération des images du film :",
            error
          );
        }
      );
    }
  }

  getMoviePosterUrl(posterPath: string): string {
    return `http://image.tmdb.org/t/p/w500/${posterPath}`;
  }

  getMovieImageUrl(imagePath: string): string {
    return `http://image.tmdb.org/t/p/w500/${imagePath}`;
  }
  getVideoUrl(videoKey: string): SafeResourceUrl {
    const url = 'https://www.youtube.com/embed/' + videoKey;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
