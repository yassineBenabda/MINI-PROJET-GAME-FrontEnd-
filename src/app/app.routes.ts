import { Routes } from '@angular/router';
//import { gameGuard } from './game.guard';
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
import { DeveloperComponent } from './developer/developer.component';
import { PlatformComponent } from './platform/platform.component';
import { AddPlatformComponent } from './add-platform/add-platform.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { UpdateDeveloperComponent } from './update-developer/update-developer.component';
import { UpdatePlatformComponent } from './update-platform/update-platform.component';
import { LibraryComponent } from './library/library.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { canActivateAuthRole } from './guards/auth-role.guard';


export const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'forbidden', component: ForbiddenComponent, },
  { path: 'verifEmail', component: VerifEmailComponent, },
  { path: 'biblio', component: LibraryComponent, },
  { path: 'games', component: GamesComponent, canActivate: [canActivateAuthRole], data: { role: 'ADMIN' } },
  { path: 'developers', component: DeveloperComponent, },
  { path: 'platforms', component: PlatformComponent, },
  { path: 'genres', component: ListeGenresComponent, },
  { path: 'recherche-par-genre', component: RechercheParGenreComponent, },
  { path: 'recherche-par-nom', component: RechercheParNomComponent, },
  // { path: 'addGames', canActivate: [gameGuard], component: AddGamesComponent, },
  // { path: 'addPlatform', canActivate: [gameGuard], component: AddPlatformComponent, },
  // { path: 'addDeveloper', canActivate: [gameGuard], component: AddDeveloperComponent, },
  // { path: 'updateGame/:id', canActivate: [gameGuard], component: UpdateGameComponent, },
  // { path: 'updateDeveloper/:id', canActivate: [gameGuard], component: UpdateDeveloperComponent, },
  // { path: 'updatePlatform/:id', canActivate: [gameGuard], component: UpdatePlatformComponent, },
  { path: '', redirectTo: 'games', pathMatch: 'full', },
];