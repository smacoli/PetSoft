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
  // Caso esteja na rota de edicao, pega o id e chemaa o servico para carregar as infos do pet pela API [loadById]
  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }

  // Caso seja na rota de criacao de um novo pet [new], retorna um objeto com parametros vazios
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
