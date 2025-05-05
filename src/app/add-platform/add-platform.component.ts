import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformService } from '../services/platform.service';
import { Platform } from '../model/platform.model';

@Component({
  selector: 'app-add-platform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-platform.component.html'
})
export class AddPlatformComponent {
  private fb = inject(FormBuilder);
  private platformService = inject(PlatformService);
  private router = inject(Router);

  platformForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    manufacturer: ['', Validators.required]
  });

  /** Submit form to create a new platform */
  onSubmit(): void {
    if (this.platformForm.invalid) {
      this.platformForm.markAllAsTouched();
      return;
    }

    const newPlatform: Platform = this.platformForm.value;

    this.platformService.create(newPlatform).subscribe({
      next: () => this.router.navigate(['/platform']),
      error: (err) => console.error('Erreur lors de l\'ajout de la plateforme', err)
    });
  }

  /** Shortcut to access form controls in template */
  get f() {
    return this.platformForm.controls;
  }
}
