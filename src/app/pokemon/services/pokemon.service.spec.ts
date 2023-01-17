import {TestBed, waitForAsync} from '@angular/core/testing';
import {PokemonService} from './pokemon.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
    service.pokemonData = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
