import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { petsResolver } from './pets.resolver';

describe('petsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => petsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
