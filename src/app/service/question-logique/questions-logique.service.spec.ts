import { TestBed } from "@angular/core/testing";

import { QuestionLogicService } from "./questions-logique.service";

describe("QuestionsLogiqueService", () => {
  let service: QuestionLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionLogicService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
