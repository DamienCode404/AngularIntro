import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieComponent } from './pages/movie/movie.component';

import { HttpClientModule } from '@angular/common/http';
import { MovieApiService } from './service/movie-api.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, MovieComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MovieApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
