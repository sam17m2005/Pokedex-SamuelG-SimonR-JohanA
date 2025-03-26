import { Link } from "react-router-dom";
import pokhome from "../../img/pokhome.png"; 

const Home = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-danger bg-opacity-75">
      <div className="row w-100 align-items-center text-center">
        
        <div className="col-md-6 order-md-last">
          <h1 className="fw-bold mb-3 text-white">¡Bienvenido a la Pokedex!</h1>
          <p className="mb-4 text-light">
            Explora y descubre información sobre tus Pokemon favoritos.
          </p>
          <Link to="/pokemons" className="btn btn-light btn-lg px-4 py-2">
            Ver Pokemon
          </Link>
        </div>

        <div className="col-md-6">
          <img
            src={pokhome}
            alt="Pokedex"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
