import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonDetailComponent} from './pages/detail/pokemon-detail.component';
import {HomeComponent} from "./pages/home/home.component";
import {SearchComponent} from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetailComponent
      },
      {
        path: 'nuevo-pokemon',
        component: PokemonDetailComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PokemonRoutingModule {
}
