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
      first(),
      tap(banhos => console.log(banhos))
    );
  }
}
