import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html'
})
export class AddGamesComponent {

  newGame = new Game();
  genres!: Genre[];
  newIdGenre!: number;
  newGenre!: Genre;
  myForm!: FormGroup;

  constructor(private gameService: GameService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.genres = this.gameService.listeGenres();
    this.myForm = this.formBuilder.group({
      idGame: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nomGame: ['', [Validators.required, Validators.minLength(5)]],
      prixGame: ['', [Validators.required, Validators.min(0)]],
      datedeSortie: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });
  }
  addGame() {
    this.newGenre = this.gameService.consulterGenre(this.newIdGenre);
    this.newGame.genre = this.newGenre;
    this.gameService.ajouterGame(this.newGame);
    this.router.navigate(['games']);
  }
}