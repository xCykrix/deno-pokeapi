import type { PokeAPI } from '../../mod.ts';
import type { UniversalResourceRedirect } from '../interface/pokeapi.co.ts';

export async function data<T>(pokeapi: PokeAPI, resource: string, identifier: string | number | UniversalResourceRedirect): Promise<T> {
  if (typeof identifier === 'string' || typeof identifier === 'number') {
    if (identifier.toString() === '0' || identifier.toString().trim() === '') {
      throw new Deno.errors.InvalidData('Identifier must be a valid name of the resource or a value of >= 1.');
    }
    return await pokeapi.get<T>(`/${resource}/${identifier}`);
  } else {
    return await pokeapi.get<T>(identifier);
  }
}
