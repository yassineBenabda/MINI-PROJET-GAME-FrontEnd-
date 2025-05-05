import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeveloperComponent } from './add-developer.component';

describe('AddDeveloperComponent', () => {
  let component: AddDeveloperComponent;
  let fixture: ComponentFixture<AddDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
