import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { SearchFilterPipe } from '../search-filter.pipe';


@Component({
    selector: 'app-recherche-par-nom',
    imports: [CommonModule, FormsModule, SearchFilterPipe],
    templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  nomGame!: string;
  games!: Game[];
  allGames!: [];
  searchTerm!: string;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.listeGame().subscribe(games => {
      this.games = games;
    });
  }
}
