import { TestBed } from '@angular/core/testing';

import { GlotApiService } from './glot-api.service';

describe('GlotApiService', () => {
  let service: GlotApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
