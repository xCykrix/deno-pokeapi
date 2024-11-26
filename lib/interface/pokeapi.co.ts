// deno-lint-ignore-file camelcase
// Master Typing Index of API.

/** A Unresolved Redirect Resource. */
export interface UniversalResourceRedirect {
  name: string;
  url: string;
}

/** A Language Resolvable Resource. */
export interface ResolvableLanguage {
  name: string;
  language: UniversalResourceRedirect;
}

/** Search Request */
export interface SearchRequest {
  count: number;
  next: null;
  previous: null;
  results: UniversalResourceRedirect[];
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

export interface BerryFlavors {
  'potency': number;
  'flavor': UniversalResourceRedirect;
}

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
