import { Component, Input } from '@angular/core';
import { Pet } from '../model/Pet';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { PetService } from '../services/pet.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent {

  @Input() pets: Pet[] = [];


  readonly displayedColumns = [
    'name',
    'age',
    'species',
    'race',
    'observation',
    'owner',
    'actions',
  ];

  constructor(public router: Router, public route: ActivatedRoute){}

  onAdd(){
    // Acao do botao adicionar pet, leva para pagina do form-pet
    this.router.navigate(['new'], {relativeTo: this.route}); // Relative to: pega a rota atual e agrega /new. Por exemplo, pets/new.
  }
}
