import { PokeAPI } from './mod.ts';

const pokeapi = new PokeAPI({});

const berry = await pokeapi.resource.berry.getBerry(1);
console.info(berry);
