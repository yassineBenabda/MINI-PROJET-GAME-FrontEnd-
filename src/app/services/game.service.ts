import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLGenre } from '../config';
import { GenreWrapper } from '../model/genre.Wrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games!: Game[];
  genres! : Genre[];
  gamesRecherche!: Game[]; 

  constructor(private http: HttpClient) {}

  listeGame(): Observable<Game[]> {
    return this.http.get<Game[]>(apiURL);
  }

  ajouterGame(game: Game): Observable<Game> {
    return this.http.post<Game>(apiURL, game, httpOptions);
  }

  supprimerGame(id: number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Game>(url);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(apiURL, game, httpOptions);
  }

  listeGenres():Observable<GenreWrapper>{
    return this.http.get<GenreWrapper>(apiURLGenre);
  }

  rechercherParCategorie(idGenre: number):Observable< Game[]> {
    const url = `${apiURL}/gamesgenre/${idGenre}`;
    return this.http.get<Game[]>(url);
  }

  /* rechercherParNom(nom: string):Observable< Game[]> {
    const url = `${apiURL}/gamesByName/${nom}`;
    return this.http.get<Game[]>(url);
  } */
  
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
}
