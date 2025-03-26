import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ selectedType, onSelectType, onSearchChange, onSearchSubmit, onReset }: { 
  selectedType: string | null,
  onSelectType: (type: string | null) => void,
  onSearchChange: (term: string) => void,
  onSearchSubmit: () => void,
  onReset: () => void
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTypeSelection = (type: string) => {  
    onSelectType(type !== "Todos" ? type : null);
    setSearchTerm(""); 
    onSearchChange(""); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) { 
      onSearchSubmit();
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
          }

          .navbar-nav .nav-link {
            transition: transform 0.3s ease, color 0.3s ease;
          }

          .navbar-nav .nav-link:hover {
            transform: scale(1.1);
            color: #012A40 !important;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="/img/pokemon-seeklogo.png" 
              alt="Logo" 
              className="img-fluid" 
              style={{ maxHeight: "70px", height: "auto", width: "auto" }} 
            />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Inicio</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Filtro por tipo {selectedType ? `(${selectedType})` : ""}
                </a>
                <ul className="dropdown-menu">
                  {["Todos", "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"].map((type) => (
                    <li key={type}>
                      <button className="dropdown-item" onClick={() => handleTypeSelection(type)}>{type}</button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <button className="btn btn-outline-danger me-2" onClick={onReset}>Reset</button>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder={selectedType ? "Desactiva el filtro de tipo para buscar" : "Busca un Pokémon"} 
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
                disabled={!!selectedType} 
              />
              <button className="btn btn-outline-success" type="submit" disabled={!!selectedType}>Buscar</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
