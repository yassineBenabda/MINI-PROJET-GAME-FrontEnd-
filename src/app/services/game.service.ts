import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { GenreWrapper } from '../model/genre.Wrapped.model';
import { AuthService } from './auth.service';

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

  apiURL: string = 'http://localhost:8080/games/api';
  apiURLGenre: string = 'http://localhost:8080/games/genre';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  listeGame(): Observable<Game[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Game[]>(`${this.apiURL}/all`, { headers: httpHeaders });
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${this.apiURL}/getbyid/${id}`;
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Game>(url, { headers });
  }

  ajouterGame(game: Game): Observable<Game> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Game>(`${this.apiURL}/addgame`, game, { headers });
  }

  supprimerGame(id: number) {
    const url = `${this.apiURL}/deletegame/${id}`;
    const jwt = `Bearer ${this.authService.getToken()}`;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  updateGame(game: Game): Observable<Game> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Game>(`${this.apiURL}/updategame`, game, { headers });
  }

  listeGenres(): Observable<GenreWrapper> {
    const jwt = `Bearer ${this.authService.getToken()}`;
    const headers = new HttpHeaders({ Authorization: jwt });
    return this.http.get<GenreWrapper>(this.apiURLGenre, { headers });
  }

  ajouterGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGenre, genre, httpOptions);
  }

  supprimerGenre(id: number) {
    const url = `${this.apiURL}/genre/deletegenre/${id}`;
    const jwt = `Bearer ${this.authService.getToken()}`;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterGenre(id: number): Genre {
    return this.genres.find((gen) => gen.idGenre == id)!;
  }

  rechercherParGenre(idGenre: number): Observable<Game[]> {
    const url = `${this.apiURL}/gamesgenre/${idGenre}`;
    return this.http.get<Game[]>(url);
  }

  rechercherParNom(nom: string): Observable<Game[]> {
    const url = `${this.apiURL}/gamesByName/${nom}`;
    return this.http.get<Game[]>(url);
  }

}