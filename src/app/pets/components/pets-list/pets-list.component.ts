import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from '../../model/Pet';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss',
})
export class PetsListComponent {

  @Input() pets: Pet[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = [
    'name',
    'age',
    'species',
    'race',
    'observation',
    'owner',
    'actions',
  ];

  constructor(public router: Router, public route: ActivatedRoute) {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(pet: Pet){
    this.edit.emit(pet);
  }
}
