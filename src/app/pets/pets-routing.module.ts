import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './containers/pets/pets.component';
import { PetFormComponent } from './containers/pets/pet-form/pet-form.component';
import { petsResolver } from './guards/pets.resolver';

const routes: Routes = [
  { path: '', component: PetsComponent },
  { path: 'new', component: PetFormComponent, resolve: { pet: petsResolver }  }, // Leva a pag de cadastro de pets (pets/new)
  { path: 'edit/:id', component: PetFormComponent, resolve: { pet: petsResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
