import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query GetPokemon($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_TYPE = gql`
  query GetPokemon($limit: Int!, $offset: Int!, $type: String) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_NAME = gql`
  query GetPokemon($limit: Int!, $offset: Int!, $name: String) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: { name: { _ilike: $name } }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_NAME_AND_TYPE = gql`
  query GetPokemon($limit: Int!, $offset: Int!, $name: String, $type: String) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        _and: [
          { name: { _ilike: $name } }
          { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } } }
        ]
      }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;