import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';
import { AllmoviesComponent } from './pages/allmovies/allmovies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'tv-show', component: TvShowComponent },
  { path: 'all-movies', component: AllmoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
