import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent {

  games!: Game[];
  genres!: Genre[];
  IdGenre!: number;
  allGames!: Game[];
  searchTerm!: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.games = this.gameService.listeGame();
  }

  supprimerGame(g: Game) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.gameService.supprimerGame(g);
      this.games = this.gameService.rechercherParGenre(this.IdGenre);
    }
  }
}
