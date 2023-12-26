import { TestBed } from '@angular/core/testing';

import { SubinstitutionsService } from './subinstitutions.service';

describe('SubinstitutionsService', () => {
  let service: SubinstitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubinstitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
