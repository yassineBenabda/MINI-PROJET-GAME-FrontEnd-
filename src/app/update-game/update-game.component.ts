import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-game.component.html'
})
export class UpdateGameComponent implements OnInit {
  currentGame = new Game();
  genres!: Genre[];
  updatedGenreId!: number;
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameService.listeGenres().subscribe(genres => {
      this.genres = genres._embedded.genres;
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
    this.currentGame.genre = this.genres.find(genre => genre.idGenre == this.updatedGenreId)!;
    this.gameService.updateGame(this.currentGame).subscribe(() => {
      this.router.navigate(['games']);
    });
  }
}
