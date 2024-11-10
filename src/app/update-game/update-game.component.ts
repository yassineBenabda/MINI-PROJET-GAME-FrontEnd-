import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html'
})
export class UpdateGameComponent {

  currentGame = new Game();
  genres!: Genre[];
  updatedGenreId!: number;
  myForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
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

    this.currentGame = this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']);
    this.updatedGenreId = this.currentGame.genre.idGenre;
  }
  updateGame() {
    this.currentGame.genre = this.gameService.consulterGenre(this.updatedGenreId);
    this.gameService.updateGame(this.currentGame);
    this.router.navigate(['games']);
  }
}