import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterLink, RouterOutlet],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'Mes Produits';

  constructor(public authService: AuthService,private router: Router,) {}

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
  }

  onLogout() {
    console.log("logout-------1");
    this.authService.logout();
  }
  
}