import { TestBed } from '@angular/core/testing';

import { XsLaravelDataTableService } from './xs-laravel-data-table.service';

describe('XsLaravelDataTableService', () => {
  let service: XsLaravelDataTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XsLaravelDataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
