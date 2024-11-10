import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  erreur: number = 0;
  user = new User();
  
  constructor(private authService : AuthService, private router: Router){}
  ngOnInit() {}
  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser)
      this.router.navigate(['/']);
    else
      this.erreur = 1;
  }
}