import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_POKEMON,
  GET_POKEMON_TYPE,
  GET_POKEMON_NAME,
  GET_POKEMON_NAME_AND_TYPE,
} from "../graphql/queries";

const usePokemon = (
  limit: number,
  offset: number,
  selectedType: string | null,
  searchTerm: string
) => {
  const [finalSearch, setFinalSearch] = useState<string>(searchTerm || ""); 
  const [isLoading, setIsLoading] = useState(true);

  const { loading, error, data, refetch } = useQuery(
    finalSearch && selectedType
      ? GET_POKEMON_NAME_AND_TYPE
      : finalSearch
      ? GET_POKEMON_NAME
      : selectedType
      ? GET_POKEMON_TYPE
      : GET_POKEMON,
    {
      variables: {
        limit,
        offset,
        name: finalSearch ? `%${finalSearch}%` : null,
        type: selectedType || null,
      },
    }
  );
  

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    setFinalSearch(searchTerm); 
  }, [searchTerm]);

  return {
    isLoading,
    error,
    data,
    refetch,
    setFinalSearch,
  };
};

export default usePokemon;
