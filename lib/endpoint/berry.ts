import type { PokeAPI } from '../../mod.ts';
import type { ResolvableLanguage, SearchRequest, UniversalResourceRedirect } from '../interface/pokeapi.co.ts';
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

/** The Berry. */
export interface Berry {
  'id': number;
  'name': string;
  'growth_time': number;
  'max_harvest': number;
  'natural_gift_power': number;
  'size': number;
  'smoothness': number;
  'soil_dryness': number;
  'firmness': UniversalResourceRedirect;
  'flavors': BerryFlavors[];
  'item': UniversalResourceRedirect;
  'natural_gift_type': UniversalResourceRedirect;
}

/** Berry Firmness. */
export interface BerryFirmness {
  'id': number;
  'name': string;
  'berries': UniversalResourceRedirect[];
  'names': ResolvableLanguage[];
}

/** Berry Flavors. */
export interface BerryFlavors {
  'potency': number;
  'flavor': UniversalResourceRedirect;
}

/** Berry Flavor. */
export interface BerryFlavor {
  'berries': [{
    'berry': UniversalResourceRedirect;
    'potency': number;
  }];
  'context_type': UniversalResourceRedirect;
  'id': number;
  'name': string;
  'names': ResolvableLanguage[];
}
