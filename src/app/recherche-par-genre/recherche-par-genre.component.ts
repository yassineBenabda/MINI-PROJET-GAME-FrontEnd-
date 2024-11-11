import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html'
})
export class RechercheParGenreComponent implements OnInit{

  games!: Game[];
  genres!: Genre[];
  IdGenre!: number;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    
    this.gameService.listeGenres().
      subscribe(genres => {
        this.genres = genres._embedded.genres;
        console.log(genres);
      });
  }

  onChange() {
    this.gameService.rechercherParCategorie(this.IdGenre).
      subscribe(games => { this.games = games });
  }
  
 
}
