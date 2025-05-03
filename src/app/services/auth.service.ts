import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:8081/users';
  private helper = new JwtHelperService();

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private rolesSubject = new BehaviorSubject<string[]>([]);
  private loggedUserSubject = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject.asObservable();
  roles$ = this.rolesSubject.asObservable();
  loggedUser$ = this.loggedUserSubject.asObservable();

  isAdmin$: Observable<boolean> = this.roles$.pipe(
    map((roles) => roles.includes('ADMIN'))
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, user, {
      observe: 'response',
    });
  }

  saveToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.tokenSubject.next(jwt);
    this.decodeJWT(jwt);
  }

  loadToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.tokenSubject.next(token);
      this.decodeJWT(token);
    }
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isTokenExpired(): boolean {
    const token = this.tokenSubject.value;
    return token ? this.helper.isTokenExpired(token) : true;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
    this.rolesSubject.next([]);
    this.loggedUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private decodeJWT(token: string): void {
    const decodedToken = this.helper.decodeToken(token);
    this.rolesSubject.next(decodedToken.roles ?? []);
    this.loggedUserSubject.next(decodedToken.sub ?? null);
  }

  isAdmin(): boolean {
    return this.rolesSubject.value.includes('ADMIN');
  }

  isLoggedIn(): boolean {
    const token = this.tokenSubject.value;
    return !!token && !this.helper.isTokenExpired(token);
  }
}
