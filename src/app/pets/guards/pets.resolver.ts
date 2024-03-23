import { PetService } from './../services/pet.service';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pet } from '../model/Pet';
import { inject } from '@angular/core';

export const petsResolver: ResolveFn<Observable<Pet>> = (
  route,
  state,
  service: PetService = inject(PetService)
) => {
  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }

  return of({
    _id: '',
    name: '',
    age: 0,
    species: '',
    race: '',
    observation: '',
    owner: '',
  });
};
