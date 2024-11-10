import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html'
})
export class RechercheParGenreComponent {

  games!: Game[];
  genres!: Genre[];
  IdGenre!: number;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.chargerGames();
  }
  chargerGames() {
    this.gameService.listeGame().subscribe(games => {
      console.log(games);
      this.games = games;
    });
  }

  supprimerGame(g: Game) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.gameService.supprimerGame(g.idGame).subscribe(() => {
        console.log("game supprimé");
        this.chargerGames();
      });
  }
}
