import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Game } from '../model/game.model';
import { AuthService } from './auth.service';
import { Bibliotheque } from '../model/Bibliotheque.model';

@Injectable({
  providedIn: 'root',
})
export class BibliothequeService {
  apiURL: string = 'http://localhost:8080/games/api/biblio';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  listeBibliotheques(): Observable<Bibliotheque[]> {
    return this.http.get<Bibliotheque[]>(`${this.apiURL}/all`, {
      headers: this.getAuthHeaders(),
    });
  }

  consulterBibliotheque(id: number): Observable<Bibliotheque> {
    return this.http.get<Bibliotheque>(`${this.apiURL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  ajouterBibliotheque(biblio: Bibliotheque): Observable<Bibliotheque> {
    return this.http.post<Bibliotheque>(`${this.apiURL}/new`, biblio, {
      headers: this.getAuthHeaders(),
    });
  }

  addGameToBibliotheque(biblioId: number, game: Game): Observable<Bibliotheque> {
    const url = `${this.apiURL}/${biblioId}/games`;
    return this.http.post<Bibliotheque>(url, game, {
      headers: this.getAuthHeaders(),
    });
  }

  removeGameFromBibliotheque(biblioId: number, gameId: number): Observable<Bibliotheque> {
    const url = `${this.apiURL}/${biblioId}/games/${gameId}`;
    return this.http.delete<Bibliotheque>(url, {
      headers: this.getAuthHeaders(),
    });
  }
}
