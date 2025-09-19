import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../model/developer.model';

@Component({
    selector: 'app-update-developer',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './update-developer.component.html'
})
export class UpdateDeveloperComponent implements OnInit {
  currentDeveloper = new Developer();
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private developerService: DeveloperService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.developerService.consulterDeveloper(this.activatedRoute.snapshot.params['id']).subscribe(developer => {
      this.currentDeveloper = developer;
    });

    this.myForm = this.formBuilder.group({
      idDeveloper: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required]]
    });
  }

  updateDeveloper() {
    if (this.myForm.valid) {
      this.developerService.updateDeveloper(this.currentDeveloper).subscribe(() => {
        this.router.navigate(['developers']);
      });
    }
  }
}
