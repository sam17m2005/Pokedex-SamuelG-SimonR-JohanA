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

export interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonabilities?: PokemonAbility[];
  pokemon_v2_pokemonstats?: PokemonStat[];
}
