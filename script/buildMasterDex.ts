import { PokemonDatabase } from '../mod.ts';
import type { Pokemon, PokemonSpecies } from '../deps.ts';

const database = new PokemonDatabase();
const index = await database.get().game.getPokedexById(1);

const indexed: string[][] = [];
indexed.push(['R. Dex', 'Name', 'Form']);

for (const entry of index.pokemon_entries) {
  const species: PokemonSpecies = await database.get().utility.getResourceByUrl(entry.pokemon_species.url);
  const {
    pokedex_numbers,
    varieties,
  } = species;
  const pokedexId = pokedex_numbers.filter((v) => v.pokedex.name === 'national')[0]!.entry_number;

  for (const variety of varieties) {
    const variant: Pokemon = await database.get().utility.getResourceByUrl(variety.pokemon.url);
    if (variant.sprites.other?.home.front_default === null) {
      console.info(variant.id, variant.name, 'null home sprite - unboxable');
      continue;
    }
    const boxable = !(variant.id > 9999);
    for (const form of variant.forms) {
      if (!boxable) continue;
      if (variant.sprites.front_female !== null) {
        indexed.push([`${pokedexId}`, variant.name, `${form.name} \u2642`]);
        indexed.push([`${pokedexId}`, variant.name, `${form.name} \u2640`]);
        console.info(`${pokedexId}`, variant.name, `${form.name} \u2642`);
        console.info(`${pokedexId}`, variant.name, `${form.name} \u2640`);
      } else {
        indexed.push([`${pokedexId}`, variant.name, `${form.name} \u26A5`]);
        console.info(`${pokedexId}`, variant.name, `\u26A5`);
      }
    }
  }
  console.info('Progress:', indexed.length);
}

Deno.writeTextFileSync('./flush.csv', indexed.map((v) => v.join('\t')).join('\n'));
