import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCvComponent } from './plantilla-cv.component';

describe('PlantillaCvComponent', () => {
  let component: PlantillaCvComponent;
  let fixture: ComponentFixture<PlantillaCvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantillaCvComponent]
    });
    fixture = TestBed.createComponent(PlantillaCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
