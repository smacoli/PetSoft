import { Component, OnInit } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../model/Pet';
import { Observable, catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]> | null = null;

  displayedColumns = [
    'name',
    'age',
    'species',
    'race',
    'observation',
    'owner',
    'actions',
  ];
  petsDataSource: MatTableDataSource<Pet> = new MatTableDataSource<Pet>();

  constructor(
    private petService: PetService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.pets$ = this.petService.list().pipe(
      catchError((error) => {
        this.onError('Falha ao carregar dados.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    if (this.pets$) {
      this.pets$.subscribe((data) => {
        this.petsDataSource.data = data;
      });
    } else {
      console.error('this.pets$ é nulo.');
    }
  }

  onAdd() {
    // Acao do botao adicionar pet, leva para página do form-pet
    this.router.navigate(['new'], { relativeTo: this.route }); // Relative to: pega a rota atual e agrega /new. Por exemplo, pets/new.
  }

  onEdit(pet: Pet) {
    this.router.navigate(['edit', pet._id], { relativeTo: this.route });
  }

  onDelete(pet: Pet) {
      this.petService.delete(pet._id).subscribe(() => {
        //Atualiza a lista
        this.refresh();
        this.snackBar.open('Pet removido com sucesso!', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error => this.onError('Erro ao tentar remover pet.')
      );
  }
}
