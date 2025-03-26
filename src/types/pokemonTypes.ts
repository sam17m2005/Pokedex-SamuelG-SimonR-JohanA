export interface PokemonType {
    pokemon_v2_type: {
      name: string;
    };
  }
  
  export interface PokemonSprite {
    sprites: {
      front_default?: string;
    };
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    pokemon_v2_pokemonsprites: PokemonSprite[];
    pokemon_v2_pokemontypes: PokemonType[];
  }
  