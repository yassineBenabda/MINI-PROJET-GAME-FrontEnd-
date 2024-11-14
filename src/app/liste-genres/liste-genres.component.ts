import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html'
})
export class ListeGenresComponent implements OnInit {


  genres!: Genre[];
  updatedGenre: Genre = { "idGenre": 0, "nomGenre": "" };
  ajout: boolean = true;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres() {
    this.gameService.listeGenres().
      subscribe(genres => {
        this.genres = genres._embedded.genres;
        console.log(genres);
      });
  }

  genreUpdated(genre: Genre) {
    console.log("Genre updated event", genre);
    this.gameService.ajouterGenre(genre).subscribe(() => this.chargerGenres());
  }

  updateGenre(genre: Genre) {
    this.updatedGenre = genre;
    this.ajout = false;
  }

}