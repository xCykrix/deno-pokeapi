import { BerryEndpoint } from './lib/endpoint/berry.ts';
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
  };

  public constructor(options: PokeAPIOptions) {
    this.options = options;
  }

  public async get<T>(path: `/${string}`): Promise<T> {
    const http = await fetch(`https://pokeapi.co/api/v2${path}`, {
      cache: 'default',
    });
    return await http.json();
  }

  public normalize(path: string): string {
    return path.replace('https://pokeapi.co', '');
  }
}
