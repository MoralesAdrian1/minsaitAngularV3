import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosExperienciaComponent } from './datos-experiencia.component';

describe('DatosExperienciaComponent', () => {
  let component: DatosExperienciaComponent;
  let fixture: ComponentFixture<DatosExperienciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosExperienciaComponent]
    });
    fixture = TestBed.createComponent(DatosExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
