import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  games!: Game[];

  constructor(private gameService: GameService, public authService : AuthService) {
    // this.games = gameService.listeGame();
  }
  
  ngOnInit(): void {
    this.chargerGames();
    }
    chargerGames(){
    this.gameService.listeGame().subscribe(games => {
    console.log(games);
    this.games = games;
    });
    }
    supprimerGame(g: Game)
    {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.gameService.supprimerGame(g.idGame).subscribe(() => {
    console.log("game supprimé");
    this.chargerGames();
    });
    } 
}
