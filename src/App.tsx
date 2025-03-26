import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import PokemonList from "./components/pages/PokemonList";
import PokemonDetail from "./components/pages/PokemonDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemons" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
};

export default App;
