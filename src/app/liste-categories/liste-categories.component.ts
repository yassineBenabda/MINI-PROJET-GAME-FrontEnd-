import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: ``
})
export class ListeCategoriesComponent implements OnInit {

  //games! :Games[];
  genres!: Genre[];
  updatedGen: Genre = { "idGenre": 0, "nomGenre": "" };
  ajout:boolean=true;

  constructor(private gameService: GameService) { }
  ngOnInit(): void {
  }

  /* ngOnInit(): void {
    this.chargerGames();
    }
    chargerGames(){
    this.gameService.listeGame().subscribe(games => {
    console.log(games);
    this.games = games;
    });
    } */
}