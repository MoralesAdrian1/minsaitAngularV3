import { TestBed } from '@angular/core/testing';

import { DatosEstudiosService } from './datos-estudios.service';

describe('DatosEstudiosService', () => {
  let service: DatosEstudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEstudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
