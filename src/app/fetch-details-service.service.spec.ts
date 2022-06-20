import { TestBed } from '@angular/core/testing';

import { FetchDetailsServiceService } from './fetch-details-service.service';

describe('FetchDetailsServiceService', () => {
  let service: FetchDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
