import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlatformService } from '../services/platform.service';
import { Platform } from '../model/platform.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './platform.component.html'
})
export class PlatformComponent implements OnInit {
  private platformService = inject(PlatformService);
  authService = inject(AuthService);

  platforms: Platform[] = [];

  ngOnInit(): void {
    this.fetchPlatforms();
  }

  fetchPlatforms(): void {
    this.platformService.getAll().subscribe({
      next: (data) => (this.platforms = data),
      error: (err) => console.error('Erreur de chargement des plateformes', err),
    });
  }

  supprimerPlatform(platform: Platform): void {
    if (confirm(`Supprimer la plateforme ${platform.name} ?`)) {
      this.platformService.delete(platform.idPlatform).subscribe({
        next: () => this.fetchPlatforms(),
        error: (err) => console.error('Erreur suppression plateforme', err),
      });
    }
  }
}
