import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAILS } from "../graphql/queries";
import { Pokemon } from "../types/pokemonTypes";

export const usePokemonDetail = (name: string) => {
  const [isLoading, setIsLoading] = useState(true);

  const { loading, error, data } = useQuery<{ pokemon_v2_pokemon: Pokemon[] }>(
    GET_POKEMON_DETAILS,
    {
      variables: { name },
    }
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  const pokemonData = data?.pokemon_v2_pokemon[0];

  return {
    isLoading,
    error,
    pokemon: pokemonData
      ? {
          name: pokemonData.name,
          height: pokemonData.height || 0,
          weight: pokemonData.weight || 0,
          sprite:
            pokemonData.pokemon_v2_pokemonsprites[0]?.sprites?.front_default ||
            "",
          abilities: pokemonData.pokemon_v2_pokemonabilities?.map(
            (a) => a.pokemon_v2_ability.name
          ) || [],
          stats: pokemonData.pokemon_v2_pokemonstats?.map((s) => ({
            name: s.pokemon_v2_stat.name,
            base: s.base_stat,
          })) || [],
        }
      : null,
  };
};
