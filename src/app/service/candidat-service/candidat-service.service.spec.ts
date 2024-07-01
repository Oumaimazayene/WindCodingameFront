import { TestBed } from '@angular/core/testing';

import { CandidatServiceService } from './candidat-service.service';

describe('CandidatServiceService', () => {
  let service: CandidatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
