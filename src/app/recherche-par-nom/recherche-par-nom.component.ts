import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit{

  nomGame!: string;
  games!: Game[];
  allGames!: [];
  searchTerm!: string;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.listeGame().subscribe(games => {console.log(games);
      this.games = games;
    });
  }
    
}
