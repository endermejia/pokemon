import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {BasicInfo, GenericResponse, Pokemon, PokemonDetailLabels} from '../../models/pokemon.model';
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
    weight: 'Peso',
    type: 'Tipo',
    img: 'Imagen',
    cancel: 'Cancelar',
    validation: {
      required: 'El campo es requerido',
      maxLength: 'El campo debe tener máximo 50 caracteres',
      minLength: 'El campo debe tener mínimo 3 caracteres'
    }
  }

  public types: string[] = [];

  public pokemonForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    weight: ['', [Validators.required, Validators.maxLength(10)]],
    types: ['', Validators.required],
  });

  constructor(
    public pokemonService: PokemonService,
    private fb: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getTypes();
  }

  public savePokemon() {
    if (this.pokemonForm.valid) {
      const pokemon: Pokemon = {
        name: this.pokemonForm.get('name')?.value,
        weight: this.pokemonForm.get('weight')?.value,
        types: this.pokemonForm.get('types')?.value.map((type: string) => ({type: {name: type, url: ''}}))
      }
      this.pokemonService.addPokemon(pokemon).subscribe(() => this.goBack());
    }
  }

  public goBack() {
    this.location.back();
  }

  private getTypes() {
    this.pokemonService.getPokemonTypes().subscribe((types: GenericResponse) =>
      this.types = types.results.map((type: BasicInfo) => type.name)
    );
  }

}
