import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Developer } from '../model/developer.model';
import { DeveloperService } from '../services/developer.service';

@Component({
  selector: 'app-add-developer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-developer.component.html'
})
export class AddDeveloperComponent implements OnInit {
  currentDeveloper = new Developer();
  developerForm!: FormGroup;

  constructor(
    private developerService: DeveloperService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.developerForm = this.formBuilder.group({
      idDeveloper: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required]]
    });
  }

  ajouterDeveloper() {
    this.developerService.ajouterDeveloper(this.currentDeveloper).subscribe(() => {
      this.router.navigate(['developers']);
    });
  }
}
