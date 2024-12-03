import type { Pokedex, PokedexDataFile } from './lib/pokedex.if.ts';
import { tsv } from './lib/struct.ts';

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
  if (![26, 27, 28, 29, 30, 31, 32, 33].includes(entries.id)) continue;
  // Process Pokedex
  let output: string[][] = [];
  const pokedexId = entries.id;
  const pokedexName = entries.name;
  const pokedexIsMainSeries = entries.is_main_series;
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
        console.info(
          `[${pokedexId}:${pokedexName} ${pokedexIsMainSeries}] (${pokedexNumber}) ${formName} / ${formIdentifier}
            isDefault:${isDefault}
            isBattleOnly:${isBattleOnly}
            isMega:${isMega}`,
        );
        output.push([`${pokedexId}`, `${pokedexNumber}`, pokedexName, formName, formIdentifier, `${pokedexIsMainSeries}`, `${isDefault}`, `${isBattleOnly}`, `${isMega}`]);
      }
    }
  }

  // Output Pokedex
  const r = tsv(
    ['pokedexId', 'pokedexNumber', 'pokedexName', 'formName', 'formIdentifier', 'isMainSeries', 'isDefault', 'isBattleOnly', 'isMega'],
    ...output,
  );
  await Deno.writeTextFile(`./dist/${pokedexName}.txt`, r);
}
