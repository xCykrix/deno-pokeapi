import { PokeAPI } from '../../mod.ts';
import { MasterRequestOptions } from '../interface/optionts.if.ts';
import { Berry, BerryFirmness } from '../interface/pokeapi.co.ts';

export class BerryEndpoint {
  private api: PokeAPI;

  public constructor(api: PokeAPI) {
    this.api = api;
  }

  public async getBerry(identifier: string | number, options?: MasterRequestOptions): Promise<Berry> {
    const result = await this.api.get<Berry>(`/berry/${identifier}`);
    if (options?.followRedirects === false) return result;
    result.firmness = await this.getBerryFirmness(result.firmness.name, { followRedirects: false });
    return result;
  }

  public async getBerryFirmness(identifier: string, options?: MasterRequestOptions): Promise<BerryFirmness> {
    const result = await this.api.get<BerryFirmness>(`/berry-firmness/${identifier}`);
    if (!options?.followRedirects === false) return result;
    for (let berry of result.berries) {
      berry = await this.getBerry(berry.name, { followRedirects: false });
    }
    return result;
  }
}
