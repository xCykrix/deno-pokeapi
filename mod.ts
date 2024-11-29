import { BerryEndpoint } from './lib/endpoint/berry.ts';
import type { PokeAPIOptions } from './lib/interface/optionts.if.ts';
import type { UniversalResourceRedirect } from './lib/interface/pokeapi.co.ts';

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

  public async get<T>(path: `/${string}` | UniversalResourceRedirect): Promise<T> {
    let base = 'https://pokeapi.co/api/v2';
    if (typeof path === 'string') {
      path = path.replace('https://pokeapi.co', '').replace('/api/v2', '') as `/${string}`;
      base = `${base}${path}`;
    } else base = path.url;
    const http = await fetch(base, {
      cache: 'default',
    });
    const json = await http.json();
    return json;
  }
}
