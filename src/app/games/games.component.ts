import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(private gameService: GameService, public authService : AuthService) {
    this.games = gameService.listeGame();
  }
  ngOnInit() {
  }

  supprimerGame(g: Game) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.gameService.supprimerGame(g);
  }
}
