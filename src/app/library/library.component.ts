import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliothequeService } from '../services/bibliotheque.service';
import { Game } from '../model/game.model';

@Component({
    selector: 'app-library',
    imports: [CommonModule],
    templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {

  games: Game[] = [];
  libraryId: number = 1; 

  constructor(private biblioService: BibliothequeService) {}

  ngOnInit(): void {
    this.loadLibraryGames();
  }

  loadLibraryGames() {
    this.biblioService.consulterBibliotheque(this.libraryId).subscribe(biblio => {
      this.games = biblio.games;
    });
  }

  removeFromLibrary(gameId: number) {
    this.biblioService.removeGameFromBibliotheque(this.libraryId, gameId).subscribe(() => {
      this.loadLibraryGames();
    });
  }
}
