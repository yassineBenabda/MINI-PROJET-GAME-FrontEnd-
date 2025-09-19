import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GameService } from '../services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-recherche-par-genre',
    imports: [CommonModule, FormsModule],
    templateUrl: './recherche-par-genre.component.html'
})
export class RechercheParGenreComponent implements OnInit {
  games!: Game[];
  genres!: Genre[];
  IdGenre!: number;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.listeGenres().subscribe(genres => {
      this.genres = genres._embedded.genres;
    });
  }

  onChange() {
    this.gameService.rechercherParGenre(this.IdGenre).subscribe(games => {
      this.games = games;
    });
  }
}
