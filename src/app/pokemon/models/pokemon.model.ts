export interface SearchLabels {
  add: string;
  delete: string;
  edit: string;
  filter: string;
  pokemon: string;
  search: string;
  table: TableLabels;
  title: string;
  validation: ValidationLabels;
}

export interface PokemonDetailLabels {
  type: string;
  cancel: string;
  img: string;
  name: string;
  pokemon: string;
  weight: string;
  save: string;
  title: string;
  validation: ValidationLabels;
}

export interface TableLabels {
  img: string;
  name: string;
  type: string;
  weight: string;
}

export interface ValidationLabels {
  maxLength: string;
  minLength: string;
  required: string;
}

export interface GenericResponse {
  count: number;
  next: string;
  previous: string;
  results: BasicInfo[];
}

export interface BasicInfo {
  name: string;
  url: string;
}

export interface Pokemon {
  id?: number;
  name: string;
  species: BasicInfo;
  sprites?: Sprites;
  types?: Type[];
  weight?: number;
}

export interface Sprites {
  front_default: string;
}

export interface Type {
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
}
