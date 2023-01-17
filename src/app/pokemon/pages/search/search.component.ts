import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchLabels, Pokemon, BasicInfo, Type} from '../../models/pokemon.model';
import {PokemonService} from '../../services/pokemon.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {

  public labels: SearchLabels = {
    title: 'Buscador datos Pokemon',
    add: 'Añadir',
    edit: 'Editar',
    delete: 'Eliminar',
    pokemon: 'Pokemon',
    search: 'Buscar',
    filter: 'Filtro',
    table: {
      name: 'Nombre',
      weight: 'Peso',
      img: 'Imagen',
      type: 'Tipo',
    },
    validation: {
      required: 'El campo es requerido',
      maxLength: 'El campo debe tener máximo 50 caracteres',
      minLength: 'El campo debe tener mínimo 3 caracteres'
    }
  };

  public pokemon: MatTableDataSource<Pokemon> = new MatTableDataSource<Pokemon>([]);
  public pageSize: number = 5;
  public displayedColumns: string[] = [
    this.labels.table.name,
    this.labels.table.weight,
    this.labels.table.type,
    this.labels.table.img,
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchForm: FormGroup = this.fb.group({
    filter: [
      '',
      [Validators.minLength(3), Validators.maxLength(50)]
    ]
  });

  constructor(
    public pokemonService: PokemonService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit() {
    this.pokemon.paginator = this.paginator;
  }

  public search(): void {
    if (this.searchForm.valid) {
      this.pokemonService.getPokemons(this.searchForm.value.filter).subscribe(
        (pokemon: Pokemon[]) => {
          this.pokemon.data = pokemon;
          this.loadPokemonDataByPage(0, this.pageSize);
        }
      );
    }
  }

  public pageEvent(event: PageEvent): void {
    this.loadPokemonDataByPage(event.pageIndex, event.pageSize);
  }

  public getTypesLabels(types: Type[]): string {
    return types?.map((type: Type) => type.type.name).join(', ');
  }

  private loadPokemonDataByPage(pageIndex: number, pageSize: number) {
    const first = pageIndex * pageSize;
    const last = first + pageSize;
    for (let i = first; i < last; i++) {
      if (this.pokemon.data[i]) {
        this.pokemonService.getPokemonDataByName(this.pokemon.data[i].name).subscribe(
          (pokemon: Pokemon) => {
            this.pokemon.data[i] = pokemon;
            this.pokemon._updateChangeSubscription();
          }
        );
      }
    }
  }
}
