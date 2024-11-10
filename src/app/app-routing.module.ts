import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GameGuard } from './game.guard';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';


const routes: Routes = [
  { path : "games" , component : GamesComponent },
  { path : "add-games" , component : AddGamesComponent, canActivate:[GameGuard] },
  { path : "updateGame/:id" , component : UpdateGameComponent },
  { path : "recherche-par-genre" , component : RechercheParGenreComponent },
  { path : "recherche-par-nom" , component : RechercheParNomComponent },
  { path : "login" , component : LoginComponent },
  { path : "app-forbidden" , component :  ForbiddenComponent },
  { path: "listeCategories", component : ListeCategoriesComponent },
  { path : "" , redirectTo : "games" , pathMatch : "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
