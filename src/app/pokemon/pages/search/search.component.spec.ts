import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.pokemonService.addedPokemonData = [
      {
        name: 'bulbasaur',
        weight: 69,
        types: [
          {
            type: {
              name: 'grass'
            }
          },
          {
            type: {
              name: 'poison'
            }
          }
        ]
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    component.searchForm.controls['filter'].setValue('bulbasaur');
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('getTypesLabels', () => {
    const types = [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      }
    ];
    expect(component.getTypesLabels(types)).toEqual('grass, poison');
  })

});
