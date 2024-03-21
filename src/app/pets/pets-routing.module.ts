import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { PetFormComponent } from './pet-form/pet-form.component';

const routes: Routes = [
  { path: '', component: PetsComponent },
  { path: 'new', component: PetFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
