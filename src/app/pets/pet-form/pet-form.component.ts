import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.scss',
})
export class PetFormComponent {

  animationDuration: string = '1500';

  form1: FormGroup; // Linkar esta variavel com o formulario html
  form2: FormGroup;
  form3: FormGroup;

  constructor(public formBuilder: FormBuilder){ // Constroi o formulario
    this.form1 = this.formBuilder.group({
      name: [null],
      age: [null]
    }),
    this.form2 = this.formBuilder.group({
      species: [null],
      race: [null]
    }),
    this.form3 = this.formBuilder.group({
      observation: [null],
      owner: [null]
    });
  }

}
