import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../model/Pet';
import { Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit{
  pets$: Observable<Pet[]>;
  displayedColumns = ['name', 'age', 'species', 'race', 'observation', 'owner', 'actions'];
  petsDataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>();

  constructor(private petService: PetService, public dialog: MatDialog, public router: Router) {
    this.pets$ = this.petService.list().pipe(
      catchError((error) => {
        this.onError('Falha ao carregar dados.')
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.pets$.subscribe((data) => {
      this.petsDataSource.data = data;
    });
  }

  onAdd(){
    this.router.navigate(['pets/new']); // Acao do botao adicionar pet, leva para pagina do form-pet
  }
}
