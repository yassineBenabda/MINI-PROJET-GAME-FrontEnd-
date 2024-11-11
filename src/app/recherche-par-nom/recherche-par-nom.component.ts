import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
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
    
    this.gameService.listeGame().
      subscribe(games => {
        console.log(games);
        this.games = games;
      });
  }
  
  rechercherGames(){
    this.gameService.rechercherParNom(this.nomGame).
    subscribe(games => {
    this.games = games;
    console.log(games)});
    }
    
}
