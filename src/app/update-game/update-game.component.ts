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

  ngOnInit(): void {
    this.gameService.listeGenres().
      subscribe(genres => {
        this.genres = genres;
        console.log(genres);
      });
    this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']).subscribe(game => {
      this.currentGame = game;
      this.updatedGenreId = this.currentGame.genre.idGenre;
    });
    this.myForm = this.formBuilder.group({
      idGame: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nomGame: ['', [Validators.required, Validators.minLength(5)]],
      prixGame: ['', [Validators.required, Validators.min(0)]],
      datedeSortie: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });
  }
  updateGame() {
    this.currentGame.genre = this.genres.
      find(genre => genre.idGenre == this.updatedGenreId)!;
    this.gameService.updateGame(this.currentGame).subscribe(game => {
      this.router.navigate(['games']);
    });
  }
}