import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlatformService } from '../services/platform.service';
import { Platform } from '../model/platform.model';
import { AuthService } from '../services/auth.service';
import { HasRolesDirective } from 'keycloak-angular';

@Component({
    selector: 'app-platform',
    imports: [CommonModule, RouterModule, HasRolesDirective],
    templateUrl: './platform.component.html'
})
export class PlatformComponent implements OnInit {
  private platformService = inject(PlatformService);
  authService = inject(AuthService);

  platforms!: Platform[];

  ngOnInit(): void {
    this.ChargerPlatforms();
  }

  ChargerPlatforms() {
    this.platformService.listePlatform().subscribe((platforms) => {
      console.log(platforms);
      this.platforms = platforms;
    });
  }
  
  supprimerPlatform(p: Platform) {
    this.platformService.supprimerPlatform(p.idPlatform!).subscribe(() => {
      console.log('platform supprimée');
      this.ChargerPlatforms();
    });
  }

}
