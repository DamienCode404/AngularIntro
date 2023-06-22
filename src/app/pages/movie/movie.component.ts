import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  showOverlay = false;
  movieId: number | null = null;
  movieDetails: any;
  videoDetails: any;
  videos: any[] = [];
  cast: any[] = [];
  crew: any[] = [];
  images: any[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

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

  handleImageError(event: any) {
    event.target.src = 'assets/user.png';
  }

  playTrailer(videoKey: string) {
    this.showOverlay = false; // Masquer l'icône de lecture
    this.movieDetails.showVideo = true; // Afficher la vidéo du film
    this.movieDetails.videoKey = videoKey; // Enregistrer la clé de la vidéo
  }

  closeVideo() {
    this.movieDetails.showVideo = false;
  }
}
