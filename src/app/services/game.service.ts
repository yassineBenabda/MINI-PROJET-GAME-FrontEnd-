import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[];
  genres: Genre[];
  gamesRecherche!: Game[];

  constructor() {

    this.genres = [
      { idGenre: 1, nomGenre: "RPG" },
      { idGenre: 2, nomGenre: "Fighting" },
      { idGenre: 3, nomGenre: "Action" }
    ];
    this.games = [
      { idGame: 1, nomGame: "Elden Ring", prixGame: 39.99, datedeSortie: new Date("06/24/2022"), genre: { idGenre: 1, nomGenre: "RPG" }, email: "customerservice@bntca.com", enable: false },
      { idGame: 2, nomGame: "Tekken 7", prixGame: 24.99, datedeSortie: new Date("01/01/2017"), genre: { idGenre: 2, nomGenre: "Fighting" }, email: "customerservice@bntca.com", enable: false },
      { idGame: 3, nomGame: "Far Cry 3", prixGame: 15.99, datedeSortie: new Date("11/29/2012"), genre: { idGenre: 3, nomGenre: "Action" }, email: "farcrybanduk@gmail.com", enable: false }
    ];
  }

  listeGame(): Game[] {
    return this.games;
  }

  ajouterGame(g: Game) {
    this.games.push(g);
  }

  supprimerGame(g: Game) {
    const index = this.games.indexOf(g, 0);
    if (index > -1) {
      this.games.splice(index, 1);
    }
  }

  consulterGame(id: number): Game {
    return this.games.find(g => g.idGame == id)!;
  }

  trierGames() {
    this.games = this.games.sort((n1, n2) => {
      if (n1.idGame! > n2.idGame!) {
        return 1;
      }
      if (n1.idGame! < n2.idGame!) {
        return -1;
      }
      return 0;
    });
  }

  updateGame(g: Game) {
    this.supprimerGame(g);
    this.ajouterGame(g);
    this.trierGames();
  }

  listeGenres(): Genre[] {
    return this.genres;
  }

  consulterGenre(id: number): Genre {
    return this.genres.find(genre => genre.idGenre == id)!;
  }

  rechercherParGenre(idGenre: number): Game[] {
    this.gamesRecherche = [];

    this.games.forEach((cur, index) => {
      if (idGenre == cur.genre.idGenre) {
        console.log("cur " + cur);
        this.gamesRecherche.push(cur);
      }
    });

    return this.gamesRecherche;
  }

  ajouterGenre(g: Genre) {
    this.genres.push(g);
    console.log(this.genres);
  }
}
