import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '../model/platform.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly apiUrl = 'http://localhost:8080/games/api/platforms';

  constructor(private http: HttpClient) {}

  /** GET all platforms */
  getAll(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/all`);
  }

  /** GET platform by ID */
  getById(id: number): Observable<Platform> {
    return this.http.get<Platform>(`${this.apiUrl}/${id}`);
  }

  /** POST create new platform */
  create(platform: Platform): Observable<Platform> {
    return this.http.post<Platform>(`${this.apiUrl}/add`, platform);
  }

  /** PUT update platform */
  update(platform: Platform): Observable<Platform> {
    if (!platform.idPlatform) {
      throw new Error('Platform ID is required for update');
    }
    return this.http.put<Platform>(`${this.apiUrl}/${platform.idPlatform}`, platform);
  }

  /** DELETE platform */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
