import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navegation/Navbar";
import usePokemon from "../../hooks/usePokemon";
import { Pokemon } from "../../types/pokemonTypes";

const PokemonList = () => {
  const [limit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [finalSearch, setFinalSearch] = useState<string>("");
  

  const { isLoading, error, data, refetch } = usePokemon(limit, offset, selectedType, finalSearch);

  const handleSearch = () => {
    setFinalSearch(searchTerm);
    refetch();
  };

  const handleReset = () => {
    setSearchTerm("");     
    setFinalSearch("");   
    setSelectedType(null); 
    setOffset(0);          
    refetch({ limit, offset: 0, name: "", type: null }); 
  };

  return (
    <div className="container-fluid min-vh-100 bg-danger bg-opacity-75">
      <Navbar 
        selectedType={selectedType}
        onSelectType={setSelectedType} 
        onSearchChange={setSearchTerm} 
        onSearchSubmit={handleSearch} 
        onReset={handleReset} 
      />

      {error ? (
        <h2 className="text-white mb-3">Error al obtener los Pokémon: {error.message}</h2>
      ) : !data || !data.pokemon_v2_pokemon ? (
        <h2 className="text-white mb-3">No se encontraron Pokémon.</h2>
      ) : isLoading ? (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
          <h2 className="text-white mb-3">Cargando...</h2>
          <div className="progress w-50">
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
              role="progressbar"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <h2 className="text-center text-white mb-4">
            {finalSearch ? `Resultados para "${finalSearch}"` : selectedType ? `Pokémon de tipo ${selectedType}` : "Lista de Pokémon"}
          </h2>

          <div className="row justify-content-center">
            {data.pokemon_v2_pokemon.map((pokemon: Pokemon) => {
              const sprite = pokemon.pokemon_v2_pokemonsprites[0]?.sprites.front_default || "/placeholder.png";
              return (
                <div key={pokemon.id} className="col-md-4 mb-4">
                  <div className="card bg-white shadow-sm p-3 text-center">
                    <h3 className="card-title text-capitalize">{pokemon.name}</h3>
                    <img
                      src={sprite}
                      alt={pokemon.name}
                      className="img-fluid d-block mx-auto w-50"
                    />
                    <p className="mt-2">
                      <strong>Tipo:</strong> {pokemon.pokemon_v2_pokemontypes.map((t) => t.pokemon_v2_type.name).join(", ")}
                    </p>
                    <Link to={`/pokemon/${pokemon.name}`} className="btn btn-primary">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button 
              className="btn btn-light me-2" 
              onClick={() => setOffset((prev) => Math.max(0, prev - 18))}
              disabled={offset === 0}
            >
              Anterior
            </button>
            <button 
              className="btn btn-light" 
              onClick={() => setOffset((prev) => prev + 18)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
