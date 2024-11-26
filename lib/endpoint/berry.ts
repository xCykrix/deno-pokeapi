import { PokeAPI } from '../../mod.ts';
import { Berry, BerryFirmness, BerryFlavor, SearchRequest, UniversalResourceRedirect } from '../interface/pokeapi.co.ts';
import { data } from '../util/request.ts';

export class BerryEndpoint {
  private api: PokeAPI;

  public constructor(api: PokeAPI) {
    this.api = api;
  }

  public async getAllBerries(): Promise<SearchRequest> {
    return await this.api.get<SearchRequest>(`/berry?limit=1000000`);
  }

  public async getAllBerryFirmness(): Promise<SearchRequest> {
    return await this.api.get<SearchRequest>(`/berry-firmness?limit=1000000`);
  }

  public async getAllBerryFlavor(): Promise<SearchRequest> {
    return await this.api.get<SearchRequest>(`/berry-flavor?limit=1000000`);
  }

  public async getBerry(identifier: string | number | UniversalResourceRedirect): Promise<Berry> {
    return await data<Berry>(this.api, 'berry', identifier);
  }

  public async getBerryFirmness(identifier: string | number | UniversalResourceRedirect): Promise<BerryFirmness> {
    return await data<BerryFirmness>(this.api, 'berry-firmness', identifier);
  }

  public async getBerryFlavor(identifier: string | number | UniversalResourceRedirect): Promise<BerryFlavor> {
    return await data<BerryFlavor>(this.api, 'berry-flavor', identifier);
  }
}
