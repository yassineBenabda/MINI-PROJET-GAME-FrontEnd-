import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Genre } from '../model/genre.model';
import { Developer } from '../model/developer.model';
import { Platform } from '../model/platform.model';
import { DeveloperService } from '../services/developer.service';
import { PlatformService } from '../services/platform.service';

@Component({
    selector: 'app-update-game',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './update-game.component.html'
})
export class UpdateGameComponent implements OnInit {
  currentGame = new Game();
  genres!: Genre[];
  updatedGenreId!: number;
  developers!: Developer[];
  platforms!: Platform[];
  updatedDeveloperId!: number;
  updatedPlatformIds: number[] = [];
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private developerService: DeveloperService,
    private platformService: PlatformService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameService.listeGenres().subscribe(genres => {
      this.genres = genres._embedded.genres;
    });

    this.developerService.listeDeveloper().subscribe(developers => {
      this.developers = developers;
    });
  
    this.platformService.listePlatform().subscribe(platforms => {
      this.platforms = platforms;
    });

    this.gameService.consulterGame(this.activatedRoute.snapshot.params['id']).subscribe(game => {
      this.currentGame = game;
      this.updatedGenreId = game.genre?.idGenre ?? 0;
      this.updatedDeveloperId = game.developer?.idDeveloper ?? 0;
      this.updatedPlatformIds = game.platforms?.map(p => p.idPlatform) ?? [];
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

  updateGame() {
    this.currentGame.genre = this.genres.find(genre => genre.idGenre == this.updatedGenreId)!;
    this.currentGame.developer = this.developers.find(developer => developer.idDeveloper == this.updatedDeveloperId)!;
    this.currentGame.platforms = this.platforms.filter(platform =>
      this.updatedPlatformIds.includes(platform.idPlatform)
    );

    this.gameService.updateGame(this.currentGame).subscribe(() => {
      this.router.navigate(['games']);
    });
  }
}
