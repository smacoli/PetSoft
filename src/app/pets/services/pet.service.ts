import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../model/Pet';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly API = 'http://localhost:8081/api/pets';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Pet[]>(this.API)
      .pipe(tap((pets) => console.log(pets)));
  }

  loadById(id: string) {
    return this.httpClient.get<Pet>(`${this.API}/${id}`);
  }

  // O Partial indica que o método save pode receber apenas alguns ou nenhum atributo do objeto pet
  save(record: Partial<Pet>) {
    // Salva o pet no backend, esta sendo chamado no construtor do pet-form.ts, no metodo onSubmit do botao salvar

    //Verificacao de existencia do registro na base de dados, caso ja exista um ID é chamado o metodo update
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Pet>) {
    return this.httpClient.post<Pet>(this.API, record).pipe(first());
  }

  private update(record: Partial<Pet>) {
    return this.httpClient
      .put<Pet>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  private delete(id: string) {
    return this.httpClient
      .delete(`${this.API}/${id}`)
      .pipe(first());
  }
}
