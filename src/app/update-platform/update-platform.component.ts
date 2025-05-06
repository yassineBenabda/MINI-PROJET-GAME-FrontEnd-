import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PlatformService } from '../services/platform.service';
import { Platform } from '../model/platform.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-platform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-platform.component.html'
})
  
export class UpdatePlatformComponent implements OnInit {
  currentPlatform = new Platform();
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private platformService: PlatformService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
    this.platformService.consulterPlatform(this.activatedRoute.snapshot.params['id']).subscribe(platform => {
      this.currentPlatform = platform;
    });

    this.myForm = this.formBuilder.group({
      idPlatform: ['', [Validators.required]],
      name: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]]
    });
  }

  updatePlatform() {
    this.platformService.updatePlatform(this.currentPlatform).subscribe(() => {
      this.router.navigate(['platforms']);
    });
  }
}
