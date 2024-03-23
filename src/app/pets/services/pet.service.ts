import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../model/Pet';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private readonly API = 'http://localhost:8081/api/pets';

  constructor(private httpClient: HttpClient) {}

  list(){
    return this.httpClient.get<Pet[]>(this.API)
    .pipe(
      tap(pets => console.log(pets))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Pet>(`${this.API}/${id}`);
  }

  save(record: Partial<Pet>){ // Salva o pet no backend, esta sendo chamado no construtor do pet-form.js, no metodo click do botao salvar
    return this.httpClient.post<Pet>(this.API, record).pipe(first());
  }
}
