import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEstudiosComponent } from './datos-estudios.component';

describe('DatosEstudiosComponent', () => {
  let component: DatosEstudiosComponent;
  let fixture: ComponentFixture<DatosEstudiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosEstudiosComponent]
    });
    fixture = TestBed.createComponent(DatosEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
