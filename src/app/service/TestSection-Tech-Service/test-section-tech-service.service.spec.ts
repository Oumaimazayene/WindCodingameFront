import { TestBed } from '@angular/core/testing';

import { TestSectionTechServiceService } from './test-section-tech-service.service';

describe('TestSectionTechServiceService', () => {
  let service: TestSectionTechServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSectionTechServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
