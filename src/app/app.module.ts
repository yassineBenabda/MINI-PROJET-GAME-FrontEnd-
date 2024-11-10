import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateGameComponent } from './update-game/update-game.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    AddGamesComponent,
    UpdateGameComponent,
    RechercheParGenreComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    LoginComponent,
    ForbiddenComponent,
    ListeCategoriesComponent,
    UpdateCategorieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
