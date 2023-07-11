import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/service/movie-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  showOverlay = false;
  tvId: number | null = null;
  tvDetails: any;
  videoDetails: any;
  videos: any[] = [];
  cast: any[] = [];
  crew: any[] = [];
  images: any[] = [];
  searchText: string = '';
  filteredActors: any[] = [];

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
      const tvIdParam = params.get('id');
      if (tvIdParam) {
        this.tvId = +tvIdParam;
        this.getTvDetails();
        this.getTvVideo();
        this.getTvCredits();
        this.getTvImages();
      }
    });
  }

  getTvDetails() {
    if (this.tvId) {
      this.movieService.getTvDetails(this.tvId).subscribe(
        (data) => {
          this.tvDetails = data;
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

  getTvVideo() {
    if (this.tvId) {
      this.movieService.getTvVideo(this.tvId).subscribe(
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

  getTvCredits() {
    if (this.tvId) {
      this.movieService.getTvCredits(this.tvId).subscribe(
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

  getTvImages() {
    if (this.tvId) {
      this.movieService.getTvImages(this.tvId).subscribe(
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
    this.tvDetails.showVideo = true; // Afficher la vidéo du film
    this.tvDetails.videoKey = videoKey; // Enregistrer la clé de la vidéo
  }

  closeVideo() {
    this.tvDetails.showVideo = false;
  }

  filterTable(searchText: string): void {
    this.searchText = searchText.toLowerCase();

    this.filteredActors = this.cast.filter(
      (actor) =>
        actor.name.toLowerCase().includes(this.searchText) ||
        actor.character.toLowerCase().includes(this.searchText)
    );
  }
}
