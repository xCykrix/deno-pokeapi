import { BerryEndpoint } from './lib/endpoint/berry.ts';
import { PokemonEndpoint } from './lib/endpoint/pokemon.ts';
import type { PokeAPIOptions } from './lib/interface/optionts.if.ts';

/**
 * Third-party Driver with Caching to The RESTful Pokemon API. Made for Deno.
 *
 * All the Pokemon data you'll ever need in one place, easily accessible through a modern free open-source RESTful API.
 *
 * https://pokeapi.co/
 */
export class PokeAPI {
  private options: PokeAPIOptions;
  public resource = {
    berry: new BerryEndpoint(this),
    pokemon: new PokemonEndpoint(this),
  };

  public constructor(options: PokeAPIOptions) {
    this.options = options;
  }

  public async getResource<T>(path: `/${string}`): Promise<T> {
    const http = await fetch(`https://pokeapi.co/api/v2${path}`, {
      cache: 'default',
    });
    return await http.json();
  }

  public strip(path: string): string {
    return path.replace('https://pokeapi.co', '');
  }
}
