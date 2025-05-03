import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-games',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-games.component.html'
})
export class AddGamesComponent implements OnInit {
  newGame = new Game();
  genres!: Genre[];
  newIdGenre!: number;
  newGenre!: Genre;
  myForm!: FormGroup;

  constructor(
    private gameService: GameService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameService.listeGenres().subscribe(genres => {
      console.log(genres);
      this.genres = genres._embedded.genres;
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

  addGame() {
    this.newGame.genre = this.genres.find(genre => genre.idGenre == this.newIdGenre)!;
    this.gameService.ajouterGame(this.newGame).subscribe(game => {
      console.log(game);
      this.router.navigate(['games']);
    });
  }
}
