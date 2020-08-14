import { TestBed } from '@angular/core/testing';

import { TmdbStoreService } from './tmdb-store.service';

describe('TmdbStoreService', () => {
  let service: TmdbStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
