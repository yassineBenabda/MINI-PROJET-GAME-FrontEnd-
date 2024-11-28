import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
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

  constructor(private http : HttpClient,
    private authService : AuthService) { }

  listeGame(): Observable<Game[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Game[]>(apiURL+"/all",{headers:httpHeaders});
  }

  ajouterGame(game: Game): Observable<Game> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Game>(apiURL+"/addgame", game, {headers:httpHeaders});
  }

  supprimerGame(id: number) {
    const url = `${apiURL}/deletegame/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.delete(url,  {headers:httpHeaders});
  }

  consulterGame(id: number): Observable<Game> {
    const url = `${apiURL}/getbyid/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Game>(url,{headers:httpHeaders});
  }

  updateGame(game: Game): Observable<Game> {
    console.log("game "+game);
    console.log(game.genre);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.put<Game>(apiURL+"/updategame", game, {headers:httpHeaders});
  }

  listeGenres():Observable<GenreWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return  this.http.get<GenreWrapper>(apiURLGenre,{headers:httpHeaders});
  }

  rechercherParGenre(idGenre: number):Observable< Game[]> {
    const url = `${apiURL}/gamesgenre/${idGenre}`;
    return this.http.get<Game[]>(url);
  }

  rechercherParNom(nom: string):Observable< Game[]> {
  const url = `${apiURL}/gamesByName/${nom}`;
  return this.http.get<Game[]>(url);
  }

  ajouterGenre( genre: Genre):Observable<Genre>{
  return this.http.post<Genre>(apiURLGenre, genre, httpOptions);
  }

}
