import { PokeAPI } from '../../mod.ts';
import { MasterRequestOptions } from '../interface/optionts.if.ts';

export class PokemonEndpoint {
  private api: PokeAPI;

  public constructor(api: PokeAPI) {
    this.api = api;
  }

  public async getAllPokemon(options?: MasterRequestOptions): Promise<void> {
  }
}
