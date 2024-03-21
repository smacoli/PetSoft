import { PetService } from './../services/pet.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.scss',
})
export class PetFormComponent {
  animationDuration: string = '1500';

  form: FormGroup; // Linkar esta variavel com o formulario html

  constructor(
    public formBuilder: FormBuilder,
    private service: PetService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    // Constroi o formulario
    this.form = this.formBuilder.group({
      name: [null],
      age: [null],
      species: [null],
      race: [null],
      observation: [null],
      owner: [null],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError(),
    });
  }

  onCancel() {
    this.location.back(); //Volta para listagem de pets
  }

  private onSuccess(){
    this._snackBar.open('Pet salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError(){
    this._snackBar.open('Erro ao salvar pet', '', { duration: 3000 }); // Snackbar de erro
  }
}
