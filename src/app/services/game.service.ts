import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GenreWrapper } from '../model/genre.Wrapped.model';
import { AuthService } from './auth.service';
import { apiURL, apiURLGenre } from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  games!: Game[];
  genres!: Genre[];
  gamesRecherche!: Game[];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  listeGame(): Observable<Game[]> {
    return this.http.get<Game[]>(`${apiURL}/all`);
  }

  ajouterGame(game: Game): Observable<Game> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Game>(`${apiURL}/addgame`, game, { headers });
  }

  supprimerGame(id: number): Observable<void> {
    const url = `${apiURL}/deletegame/${id}`;
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.delete<void>(url, { headers });
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${apiURL}/getbyid/${id}`;
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Game>(url, { headers });
  }

  updateGame(game: Game): Observable<Game> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Game>(`${apiURL}/updategame`, game, { headers });
  }

  listeGenres(): Observable<GenreWrapper> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.get<GenreWrapper>(apiURLGenre, { headers });
  }

  rechercherParGenre(idGenre: number): Observable<Game[]> {
    const url = `${apiURL}/gamesgenre/${idGenre}`;
    return this.http.get<Game[]>(url);
  }

  rechercherParNom(nom: string): Observable<Game[]> {
    const url = `${apiURL}/gamesByName/${nom}`;
    return this.http.get<Game[]>(url);
  }

  ajouterGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(apiURLGenre, genre, httpOptions);
  }
}