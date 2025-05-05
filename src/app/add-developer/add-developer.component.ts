import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../model/developer.model';

@Component({
  selector: 'app-add-developer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent {
  developer: Developer = {
    name: '',
    country: ''
  };

  submitted = false;

  constructor(private developerService: DeveloperService) {}

  saveDeveloper(): void {
    this.developerService.create(this.developer).subscribe({
      next: (res) => {
        console.log('Developer created successfully:', res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.saveDeveloper();
    }
  }

  newDeveloper(): void {
    this.submitted = false;
    this.developer = {
      name: '',
      country: ''
    };
  }
}
