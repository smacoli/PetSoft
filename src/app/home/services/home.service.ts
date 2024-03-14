import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bath } from '../model/Bath';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API = '/assets/banhos.json';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Bath[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap(banhos => console.log(banhos))
    );
  }
}
