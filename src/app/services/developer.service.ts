import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Developer } from '../model/developer.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private baseUrl = 'http://localhost:8080/games/api/developers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  listeDeveloper(): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.baseUrl}/all`, { headers: this.getAuthHeaders() });
  }

  consulterDeveloper(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${this.baseUrl}/getbyid/${id}`, { headers: this.getAuthHeaders() });
  }

  ajouterDeveloper(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(`${this.baseUrl}/adddeveloper`, developer, { headers: this.getAuthHeaders() });
  }

  updateDeveloper(developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.baseUrl}/updatedeveloper`, developer, { headers: this.getAuthHeaders() });
  }

  supprimerDeveloper(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletedeveloper/${id}`, { headers: this.getAuthHeaders() });
  }
}
