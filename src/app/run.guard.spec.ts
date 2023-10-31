import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { runGuard } from './run.guard';

describe('runGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => runGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
