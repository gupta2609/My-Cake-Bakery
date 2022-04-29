import { TestBed } from '@angular/core/testing';

import { SortserviceService } from './sortservice.service';

describe('SortserviceService', () => {
  let service: SortserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
