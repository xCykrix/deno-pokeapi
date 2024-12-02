// deno-lint-ignore-file camelcase

export interface PokedexDataFile {
  data: {
    pokemon_v2_pokedex: Pokedex[];
  };
}

export interface Pokedex {
  id: number;
  name: string;
  pokemon_v2_pokemondexnumbers: PokedexEntry[];
}

export interface PokedexEntry {
  pokedex_number: number;
  pokemon_v2_pokemonspecy: {
    id: number;
    name: string;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    pokemon_v2_pokemons: Pokemons[];
  };
}

export interface Pokemons {
  id: number;
  name: string;
  pokemon_v2_pokemonforms: PokemonForms[];
}

export interface PokemonForms {
  id: number;
  name: string;
  form_name: string;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
}
