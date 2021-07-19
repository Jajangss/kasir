import { TestBed } from '@angular/core/testing';

import { KasirService } from './kasir.service';

describe('KasirService', () => {
  let service: KasirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KasirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
