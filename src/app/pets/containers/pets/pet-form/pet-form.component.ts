import { PetService } from '../../../services/pet.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../../model/Pet';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.scss',
})
export class PetFormComponent {
  animationDuration: string = '1000';

  form: FormGroup; // Linkar esta variavel com o formulario html

  constructor(
    public formBuilder: FormBuilder,
    private service: PetService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // Constroi o formulario
    this.form = this.formBuilder.group({
      _id: [''], //Campo escondido no form, apenas o componente tem acesso
      name: ['', [Validators.required, Validators.maxLength(20)]],
      age: [''],
      species: ['', [Validators.required]],
      race: [''],
      observation: [''],
      owner: ['', [Validators.required, Validators.maxLength(50)]],
    });

    const pet: Pet = this.route.snapshot.data['pet'];

    //Pega as infos do pet e preenche o formulario de edicao com elas
    this.form.patchValue({
      _id: pet._id,
      name: pet.name,
      age: pet.age,
      species: pet.species,
      race: pet.race,
      observation: pet.observation,
      owner: pet.owner,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) =>
        this._snackBar.open('Os dados foram atualizados!', '', {
          duration: 3000,
        }),
      error: (error) => this.onError(),
    });
    this.location.back();
  }

  onCancel() {
    this.location.back(); //Volta para listagem de pets
  }

  private onSuccess() {
    this._snackBar.open('Pet salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar pet.', '', { duration: 3000 }); // Snackbar de erro
  }

  //Validação do formulário
  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 20;
      return `Tamanho máximo de ${requiredLength} caracteres`;
    }

    return 'Campo inválido'
  }
}
