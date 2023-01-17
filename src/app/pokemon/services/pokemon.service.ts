import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {Pokemon, BasicInfo, GenericResponse} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemonData: BasicInfo[] = [];
  public addedPokemonData: Pokemon[] = [];
  public showSpinner: boolean = false;

  constructor(private http: HttpClient) {
  }

  public getPokemons(filter: string): Observable<BasicInfo[]> {
    this.showSpinner = true;
    return new Observable<BasicInfo[]>((observer: Subscriber<BasicInfo[]>) => {
      this.getPokemonBasicData().subscribe((data: GenericResponse) => {
        this.pokemonData = data.results.filter((pokemon: BasicInfo) =>
          pokemon.name.toLowerCase().includes(filter.toLowerCase())
        );
        observer.next(this.pokemonData);
        this.showSpinner = false;
      });
    });
  }

  public addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    this.showSpinner = true;
    return new Observable<Pokemon>((observer: Subscriber<Pokemon>) => {
      if (!this.addedPokemonData.includes(pokemon)) {
        this.addedPokemonData.push(pokemon);
      }
      observer.next(pokemon);
      this.showSpinner = false;
    });
  }

  public getPokemonTypes(): Observable<GenericResponse> {
    return this.http.get('https://pokeapi.co/api/v2/type') as Observable<GenericResponse>;
  }

  public getPokemonBasicData(): Observable<GenericResponse> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279') as Observable<GenericResponse>;
  }

  public getPokemonDataByName(name: string): Observable<Pokemon> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`) as Observable<Pokemon>;
  }

}
