import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLComponent } from './datos-l.component';

describe('DatosLComponent', () => {
  let component: DatosLComponent;
  let fixture: ComponentFixture<DatosLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosLComponent]
    });
    fixture = TestBed.createComponent(DatosLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
