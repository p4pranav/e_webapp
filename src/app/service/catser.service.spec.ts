import { TestBed } from '@angular/core/testing';

import { CatserService } from './catser.service';

describe('CatserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatserService = TestBed.get(CatserService);
    expect(service).toBeTruthy();
  });
});
