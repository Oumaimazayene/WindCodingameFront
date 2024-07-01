import { TestBed } from '@angular/core/testing';

import { QuestionsTechService } from './questions-tech.service';

describe('QuestionsTechService', () => {
  let service: QuestionsTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
