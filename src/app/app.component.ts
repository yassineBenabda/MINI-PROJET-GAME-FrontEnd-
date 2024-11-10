import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'Game';

  constructor(public authService : AuthService, private router : Router) {}
  
  ngOnInit() {
    let isloggedin: string = localStorage.getItem('isloggedIn') || '';
    let loggedUser: string  = localStorage.getItem('loggedUser') || '';
    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {
    this.authService.logout();
  }
}