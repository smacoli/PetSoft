import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets/pets.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { PetFormComponent } from './pet-form/pet-form.component';


@NgModule({
  declarations: [
    PetsComponent,
    PetFormComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    AppMaterialModule
  ]
})
export class PetsModule { }
