import { Component, inject, OnInit } from '@angular/core';
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

  export class AddPlatformComponent implements OnInit {
    currentPlatform = new Platform();
    platformForm!: FormGroup;
  
    constructor(
      private platformService: PlatformService,
      private router: Router,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.platformForm = this.formBuilder.group({
        idPlatform: [''],
        name: ['', [Validators.required]],
        manufacturer: ['', [Validators.required]]
      });
    }
  
    ajouterPlatform() {
      this.platformService.ajouterPlatform(this.currentPlatform).subscribe(() => {
        this.router.navigate(['platforms']);
      });
    }
  }
