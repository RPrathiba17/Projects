import { TestBed } from '@angular/core/testing';

import { FlaskapiserviceService } from './flaskapiservice.service';

describe('FlaskapiserviceService', () => {
  let service: FlaskapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaskapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
