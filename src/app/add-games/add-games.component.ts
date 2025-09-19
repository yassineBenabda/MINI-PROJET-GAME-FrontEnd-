import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Developer } from '../model/developer.model';
import { Platform } from '../model/platform.model';
import { DeveloperService } from '../services/developer.service';
import { PlatformService } from '../services/platform.service';

@Component({
    selector: 'app-add-games',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
    templateUrl: './add-games.component.html'
})
export class AddGamesComponent implements OnInit {
  myForm!: FormGroup;
  newGame = new Game();
  genres!: Genre[];
  newGenre!: Genre;
  newIdGenre!: number;
  developers!: Developer[];
  newIdDeveloper!: number;
  platforms!: Platform[];
  selectedPlatformIds: number[] = [];

  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private platformService: PlatformService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameService.listeGenres().subscribe(genres => {
      console.log(genres);
      this.genres = genres._embedded.genres;
    });

    this.developerService.listeDeveloper().subscribe(devs => {
      this.developers = devs;
    });
  
    this.platformService.listePlatform().subscribe(plats => {
      this.platforms = plats;
    });
  
    this.myForm = this.formBuilder.group({
      idGame: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nomGame: ['', [Validators.required, Validators.minLength(5)]],
      prixGame: ['', [Validators.required, Validators.min(0)]],
      datedeSortie: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      developer: ['', [Validators.required]],
      platforms: ['', [Validators.required]]
    });
  }

  addGame() {
    this.newGame.genre = this.genres.find(genre => genre.idGenre == this.newIdGenre)!;
    this.newGame.developer = this.developers.find(d => d.idDeveloper == this.newIdDeveloper)!;
    this.newGame.platforms = this.platforms.filter(p => this.selectedPlatformIds.includes(p.idPlatform));
    this.gameService.ajouterGame(this.newGame).subscribe(game => {
      console.log(game);
      this.router.navigate(['games']);
    });
  }
}
