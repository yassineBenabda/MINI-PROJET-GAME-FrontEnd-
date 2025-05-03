import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err : any;
  loading : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService : AuthService,
              private router: Router,
              private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRegister() {
    this.loading=true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this. authService.setRegistredUser(this.user);
        //alert("veillez confirmer votre email");
        this.loading=false;
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);

      },
      error: (err: any) => {
        this.loading=false;
        if ((err.error.errorCode ===  "USER_EMAIL_ALREADY_EXISTS")) {
          this.err = "Email already used!";
        }
      },
    });
  }
}