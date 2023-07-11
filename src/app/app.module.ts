import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './service/movie-api.service';
import { TvShowComponent } from './pages/tv-show/tv-show.component';
import { AllmoviesComponent } from './pages/allmovies/allmovies.component';
import { TvComponent } from './pages/tv/tv.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieComponent,
    AuthenticationComponent,
    TvShowComponent,
    AllmoviesComponent,
    TvComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
  ],
  providers: [MovieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
