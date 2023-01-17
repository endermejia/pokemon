import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonDetailLabels} from '../../models/pokemon.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public labels: PokemonDetailLabels = {
    title: 'Detalle del Pokemon',
    save: 'Guardar',
    pokemon: 'Pokemon',
    name: 'Nombre',
    publisher: 'Editorial',
    alter_ego: 'Alter ego',
    first_appearance: 'Primera aparición',
    cancel: 'Cancelar',
    validation: {
      required: 'El campo es requerido',
      maxLength: 'El campo debe tener máximo 50 caracteres',
      minLength: 'El campo debe tener mínimo 3 caracteres'
    }
  }

  public pokemonForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    publisher: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    alter_ego: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    first_appearance: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
  });

  constructor(
    public pokemonService: PokemonService,
    private fb: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  public savePokemon() {
    if (this.pokemonForm.valid) {
      this.pokemonService.addPokemon(this.pokemonForm.value).subscribe(() => this.goBack());
    }
  }

  public goBack() {
    this.location.back();
  }

}
