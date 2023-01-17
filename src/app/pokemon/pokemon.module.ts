import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {PokemonRoutingModule} from './pokemon-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {PokemonDetailComponent} from './pages/detail/pokemon-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {SearchComponent} from './pages/search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    PokemonDetailComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    HttpClientModule
  ]
})
export class PokemonModule {
}
