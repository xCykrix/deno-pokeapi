import { MainClient } from './deps.ts';

/**
 * Third-party Driver with Caching to The RESTful Pokemon API. Made for Deno.
 *
 * All the Pokemon data you'll ever need in one place, easily accessible through a modern free open-source RESTful API.
 *
 * https://pokeapi.co/
 */
export class PokemonDatabase {
  private api: MainClient;

  public constructor() {
    this.api = new MainClient();
  }

  public get(): MainClient {
    return this.api;
  }
}
