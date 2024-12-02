import type { Pokedex, PokedexDataFile } from './lib/pokedex.if.ts';

const database = JSON.parse(await Deno.readTextFileSync('./data.json')) as PokedexDataFile;

//
class PokedexCreate {
  public index: Pokedex[] = [];

  public constructor(struct: PokedexDataFile) {
    this.index.push(...struct.data.pokemon_v2_pokedex);
  }
}

const pokedex = new PokedexCreate(database);
for (const entries of pokedex.index) {
  const pokedexId = entries.id;
  const pokedexName = entries.name;
  for (const entry of entries.pokemon_v2_pokemondexnumbers) {
    const pokedexNumber = entry.pokedex_number;
    const spec = entry.pokemon_v2_pokemonspecy;
    for (const pokemon of spec.pokemon_v2_pokemons) {
      for (const form of pokemon.pokemon_v2_pokemonforms) {
        const formName = form.name;
        const formIdentifier = form.form_name;
        const isDefault = form.is_default;
        const isBattleOnly = form.is_battle_only;
        const isMega = form.is_mega;
        console.info(`[${pokedexId}:${pokedexName}] (${pokedexNumber}) ${formName} / ${formIdentifier} / isDefault:${isDefault} isBattleOnly:${isBattleOnly} isMega:${isMega}`);
      }
    }
  }
}
