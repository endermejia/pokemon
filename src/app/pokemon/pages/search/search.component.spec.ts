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
    component.pokemonService.pokemonData = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search OK', waitForAsync(() => {
    component.searchForm.controls['filter'].setValue('batman');
    component.search();
    setTimeout(() => {
      expect(component.pokemon.data.length).toEqual(0);
    }, 2000);
  }));

  it('search KO', waitForAsync(() => {
    component.searchForm.controls['filter'].setValue('superman');
    component.search();
    setTimeout(() => {
      expect(component.pokemon.data.length).toEqual(0);
    }, 2000);
  }));


});
