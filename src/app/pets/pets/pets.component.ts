import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../model/Pet';
import { Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit{
  pets$: Observable<Pet[]>;
  displayedColumns = ['name', 'age', 'species', 'race', 'observation', 'owner'];
  petsDataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>();

  constructor(private petService: PetService, public dialog: MatDialog) {
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
}
