import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate(); 
  const { isLoading, error, pokemon } = usePokemonDetail(name || "");

  return (
    <div className="container-fluid min-vh-100 bg-danger bg-opacity-75 d-flex flex-column align-items-center justify-content-center py-4">
      {error ? (
        <h2 className="text-white mb-3">Error al obtener los detalles: {error.message}</h2>
      ) : !pokemon ? (
        <h2 className="text-white mb-3">No se encontró el Pokémon.</h2>
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
        <div className="container bg-white p-5 rounded-4 shadow-lg text-dark text-center">
          <h2 className="pokemon-name mb-4 text-uppercase fw-bold text-primary">{pokemon.name}</h2>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 d-flex justify-content-center">
              <img 
                src={pokemon.sprite} 
                alt={pokemon.name} 
                className="pokemon-image img-fluid w-50 rounded-circle border border-3 border-primary shadow-sm" 
              />
            </div>
            <div className="col-md-8 text-start d-flex flex-column align-items-center">
              <div className="pokemon-info text-center w-75">
                <p className="mb-1"><strong>Altura:</strong> {pokemon.height ? `${pokemon.height / 10} m` : "No disponible"}</p>
                <p className="mb-3"><strong>Peso:</strong> {pokemon.weight ? `${pokemon.weight / 10} kg` : "No disponible"}</p>
              </div>
              <div className="pokemon-details w-75">
                <h4 className="text-secondary fw-semibold border-bottom pb-2">Habilidades</h4>
                <ul className="list-unstyled text-start">
                  {pokemon.abilities.length > 0 ? (
                    pokemon.abilities.map((ability: string, index: number) => (
                      <li key={index} className="py-1 px-2 bg-light rounded shadow-sm my-1">{ability}</li>
                    ))
                  ) : (
                    <li>No disponible</li>
                  )}
                </ul>

                <h4 className="text-secondary fw-semibold border-bottom pb-2 mt-3">Estadísticas</h4>
                <ul className="list-unstyled text-start">
                  {pokemon.stats.length > 0 ? (
                    pokemon.stats.map((stat: { name: string; base: number }) => (
                      <li key={stat.name} className="py-1 px-3 bg-light rounded shadow-sm my-1">
                        <strong>{stat.name}:</strong> {stat.base}
                      </li>
                    ))
                  ) : (
                    <li>No disponible</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-dark mt-4 px-4 py-2 fw-semibold" onClick={() => navigate(-1)}>
            Volver Atrás
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
