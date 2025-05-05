import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Developer } from '../model/developer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private baseUrl = 'http://localhost:8080/games/api/developers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Developer[]> {
    return this.http.get<Developer[]>(this.baseUrl+"/all");
  }

  getById(id: number): Observable<Developer> {
    return this.http.get<Developer>(`${this.baseUrl}/${id}`);
  }

  create(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(this.baseUrl+"/add", developer);
  }

  update(id: number, developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.baseUrl}/${id}`, developer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
