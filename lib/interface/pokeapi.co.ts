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
