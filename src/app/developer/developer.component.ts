import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeveloperService } from '../services/developer.service';
import { Developer } from '../model/developer.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './developer.component.html',
})
export class DeveloperComponent implements OnInit {
  private developerService = inject(DeveloperService);
  authService = inject(AuthService);

  developers: Developer[] = [];

  ngOnInit(): void {
    this.fetchDevelopers();
  }

  fetchDevelopers(): void {
    this.developerService.getAll().subscribe({
      next: (data) => (this.developers = data),
      error: (err) => console.error('Erreur de chargement des développeurs', err),
    });
  }

  
}
