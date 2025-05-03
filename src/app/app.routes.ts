import { Routes } from '@angular/router';
import { GameGuard } from './game.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./games/games.component').then(m => m.GamesComponent),
  },
  {
    path: 'add-games',
    canActivate:[GameGuard],
    loadComponent: () =>
      import('./add-games/add-games.component').then(m => m.AddGamesComponent),
  },
  {
    path: 'updateGame/:id',
    canActivate:[GameGuard],
    loadComponent: () =>
      import('./update-game/update-game.component').then(m => m.UpdateGameComponent),
  },
  {
    path: 'recherche-par-genre',
    loadComponent: () =>
      import('./recherche-par-genre/recherche-par-genre.component').then(m => m.RechercheParGenreComponent),
  },
  {
    path: 'recherche-par-nom',
    loadComponent: () =>
      import('./recherche-par-nom/recherche-par-nom.component').then(m => m.RechercheParNomComponent),
  },
  {
    path: 'liste-genres',
    loadComponent: () =>
      import('./liste-genres/liste-genres.component').then(m => m.ListeGenresComponent),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./forbidden/forbidden.component').then(m => m.ForbiddenComponent),
  },
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
];
