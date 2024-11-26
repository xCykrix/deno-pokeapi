// deno-lint-ignore-file camelcase
// Master Typing Index of API.

export interface Redirectable {
  name: string;
  url: string;
}

export interface LanguageResolvable {
  name: string;
}

export interface Berry {
  'id': number;
  'name': string;
  'growth_time': number;
  'max_harvest': number;
  'natural_gift_power': number;
  'size': number;
  'smoothness': number;
  'soil_dryness': number;
  'firmness': BerryFirmness | Redirectable;
  'flavors': [
    {
      'potency': 10;
      'flavor': {
        'name': 'spicy';
        'url': 'https://pokeapi.co/api/v2/berry-flavor/1/';
      };
    },
  ];
  'item': Redirectable;
  'natural_gift_type': {
    'name': 'fire';
    'url': 'https://pokeapi.co/api/v2/type/10/';
  };
}

export interface BerryFirmness {
  'id': number;
  'name': string;
  'berries': Berry[] | Redirectable[];
  'names': {
    'name': string;
    'language': LanguageResolvable;
  }[];
}

export interface BerryFlavor {
}
