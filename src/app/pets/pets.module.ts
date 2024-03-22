import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './containers/pets/pets.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { PetFormComponent } from './containers/pets/pet-form/pet-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PetsListComponent } from './components/pets-list/pets-list.component';


@NgModule({
  declarations: [
    PetsComponent,
    PetFormComponent,
    PetsListComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule // Fornece form builder e form group para formularios
  ]
})
export class PetsModule { }
