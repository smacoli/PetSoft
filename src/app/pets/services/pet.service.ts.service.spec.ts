import { TestBed } from '@angular/core/testing';

import { PetServiceTsService } from './pet.service';

describe('PetServiceTsService', () => {
  let service: PetServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
