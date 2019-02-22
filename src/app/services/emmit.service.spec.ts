import { TestBed } from '@angular/core/testing';

import { EmmitService } from './emmit.service';

describe('EmmitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmmitService = TestBed.get(EmmitService);
    expect(service).toBeTruthy();
  });
});
