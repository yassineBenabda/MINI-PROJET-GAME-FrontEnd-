import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiURL: string = 'http://localhost:8080/games/api';



  games!: Game[];
  /* genres! : Genre[];
  gamesRecherche!: Game[]; */

  constructor(private http: HttpClient) {

    /* this.genres = [
      { idGenre: 1, nomGenre: "RPG" },
      { idGenre: 2, nomGenre: "Fighting" },
      { idGenre: 3, nomGenre: "Action" }
    ]; */
    /* this.games = [
      { idGame: 1, nomGame: "Elden Ring", prixGame: 39.99, datedeSortie: new Date("06/24/2022"), genre: { idGenre: 1, nomGenre: "RPG" }, email: "customerservice@bntca.com", enable: false },
      { idGame: 2, nomGame: "Tekken 7", prixGame: 24.99, datedeSortie: new Date("01/01/2017"), genre: { idGenre: 2, nomGenre: "Fighting" }, email: "customerservice@bntca.com", enable: false },
      { idGame: 3, nomGame: "Far Cry 3", prixGame: 15.99, datedeSortie: new Date("11/29/2012"), genre: { idGenre: 3, nomGenre: "Action" }, email: "farcrybanduk@gmail.com", enable: false }
    ]; */
  }



  listeGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiURL);
  }

  ajouterGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiURL, game, httpOptions);
  }

  supprimerGame(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Game>(url);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(this.apiURL, game, httpOptions);
  }

  listeGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiURL+"/genre");
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



  
/*
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
  } */
}
