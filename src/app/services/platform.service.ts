import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '../model/platform.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  apiUrl: string = 'http://localhost:8080/games/api/platforms';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /** GET all platforms */
  listePlatform(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() });
  }

  /** GET platform by ID */
  consulterPlatform(id: number): Observable<Platform> {
    return this.http.get<Platform>(`${this.apiUrl}/getbyid/${id}`, { headers: this.getAuthHeaders() });
  }

  /** POST create new platform */
  ajouterPlatform(platform: Platform): Observable<Platform> {
    return this.http.post<Platform>(`${this.apiUrl}/addplatform`, platform, { headers: this.getAuthHeaders() });
  }

  /** PUT update platform */
  updatePlatform(platform: Platform): Observable<Platform> {
    return this.http.put<Platform>(`${this.apiUrl}/updateplatform`, platform, { headers: this.getAuthHeaders() });
  }

  /** DELETE platform */
  supprimerPlatform(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteplatform/${id}`, { headers: this.getAuthHeaders() });
  }
}
