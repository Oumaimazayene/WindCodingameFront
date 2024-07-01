import { TestBed } from "@angular/core/testing";

import { TestSectionLogiqueService } from "./test-section-logique-service.service";

describe("TestSectionLogiqueServiceService", () => {
  let service: TestSectionLogiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSectionLogiqueService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
