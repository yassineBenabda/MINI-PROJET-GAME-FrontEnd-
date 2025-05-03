import { Routes } from '@angular/router';
import { gameGuard } from './game.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GamesComponent } from './games/games.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: 'add-games',
    canActivate: [gameGuard],
    component: AddGamesComponent,
  },
  {
    path: 'updateGame/:id',
    canActivate: [gameGuard],
    component: UpdateGameComponent,
  },
  {
    path: 'recherche-par-genre',
    component: RechercheParGenreComponent,
  },
  {
    path: 'recherche-par-nom',
    component: RechercheParNomComponent,
  },
  {
    path: 'liste-genres',
    component: ListeGenresComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'verifEmail',
    component: VerifEmailComponent,
  },
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
];