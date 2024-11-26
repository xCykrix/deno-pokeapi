import { assert, assertEquals } from '../deps.ts';
import { BerryFlavor, BerryFlavors } from '../lib/interface/pokeapi.co.ts';
import { remap } from '../lib/util/array.ts';
import { PokeAPI } from '../mod.ts';

Deno.test({
  name: '@pokemon/poke-api - resource.berry',
  fn: async (t) => {
    const pokeapi = new PokeAPI({});

    // getAllBerries()
    await t.step({
      name: 'getAllBerries()',
      fn: async () => {
        const berries = (await pokeapi.resource.berry.getAllBerries()).results;
        const redirect = berries.find((v) => v.name === 'oran');
        assert(redirect);
        assert(redirect.url);
        assertEquals(redirect.url, 'https://pokeapi.co/api/v2/berry/7/');
      },
    });

    // TODO: getAllBerryFirmness()
    await t.step({
      name: 'getAllBerryFirmness()',
      fn: async () => {
        const firmnesses = (await pokeapi.resource.berry.getAllBerryFirmness()).results;
        const redirect = firmnesses.find((v) => v.name === 'super-hard');
        assert(redirect);
        assert(redirect.url);
        assertEquals(redirect.url, 'https://pokeapi.co/api/v2/berry-firmness/5/');
      },
    });

    // TODO: getAllBerryFlavor()

    // getBerry()
    await t.step({
      name: 'getBerry()',
      fn: async () => {
        const berryFromIdentifier = await pokeapi.resource.berry.getBerry('7');
        assertEquals(berryFromIdentifier.name, 'oran');
      },
    });

    // getBerryFirmness()
    await t.step({
      name: 'getBerryFirmness()',
      fn: async () => {
        const berryFromIdentifier = await pokeapi.resource.berry.getBerry('7');
        const firmness = await pokeapi.resource.berry.getBerryFirmness(berryFromIdentifier.firmness);
        assertEquals(firmness.name, 'super-hard');
      },
    });

    // getBerryFlavor()
    await t.step({
      name: 'getBerryFlavor()',
      fn: async () => {
        const berryFromIdentifier = await pokeapi.resource.berry.getBerry('7');
        const flavors = await remap<BerryFlavors, BerryFlavor>(berryFromIdentifier.flavors.filter((v) => v.potency !== 0), async (v) => {
          return await pokeapi.resource.berry.getBerryFlavor(v.flavor);
        });
        const named = flavors.map((v) => v.name);
        assertEquals(named.join(';'), 'spicy;dry;bitter;sour');
      },
    });
  },
});

/**
 * const pokeapi = new PokeAPI({});

const berries = await pokeapi.resource.berry.getAllBerries();
for (const result of berries.results) {



  // oran 7 super-hard spicy;dry;bitter;sour
  console.info(berry.name, berry.id, firmness.name, namedFlavors.join(';'));
}
 */
