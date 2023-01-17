import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {Pokemon, BasicInfo, GenericResponse} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemonData: Pokemon[] = [];
  public addedPokemonData: Pokemon[] = [];
  public showSpinner: boolean = false;

  constructor(private http: HttpClient) {
  }

  public getPokemons(filter: string): Observable<Pokemon[]> {
    this.showSpinner = true;
    return new Observable<Pokemon[]>((observer: Subscriber<Pokemon[]>) => {
      this.getPokemonBasicData().subscribe((data: GenericResponse) => {
        this.pokemonData = data.results
          .map((pokemon: BasicInfo) => {
            return {
              name: pokemon.name
            } as Pokemon;
          })
          .filter((pokemon: Pokemon) => pokemon.name.includes(filter));
        this.pokemonData = this.addedPokemonData.concat(this.pokemonData);
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
      // delay 1 second to show spinner
      setTimeout(() => {
        this.showSpinner = false;
        observer.next(pokemon);
      }, 1000);
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
