import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { BibliothequeService } from '../services/bibliotheque.service';

@Component({
    selector: 'app-games',
    imports: [CommonModule, RouterModule],
    templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

  games!: Game[];
  currentLibraryId: number = 1;

  constructor(private gameService: GameService, public authService: AuthService, private biblioService: BibliothequeService) {}

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
    this.gameService.supprimerGame(g.idGame).subscribe(() => {
      console.log("game supprimé");
      this.chargerGames();
    });
  }
  addToLibrary(game: Game) {
    this.biblioService.addGameToBibliotheque(this.currentLibraryId, game).subscribe(() => {
      alert(`Le jeu "${game.nomGame}" a été ajouté à votre bibliothèque.`);
    });
  }
}
