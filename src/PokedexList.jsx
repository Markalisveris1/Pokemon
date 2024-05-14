import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Head";
import PokemonCard from "./components/PokemonCard";

const PokedexList = () => {
  const [pokedex, setPokedex] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    try {
      const storedPokedex = JSON.parse(localStorage.getItem("pokedex"));
      if (Array.isArray(storedPokedex)) {
        setPokedex(storedPokedex);
      } else {
        localStorage.removeItem("pokedex");
      }
    } catch (e) {
      localStorage.removeItem("pokedex");
    }
  }, []);

  const handleNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = pokedex.findIndex((p) => p.number === selectedPokemon.number);
    const nextIndex = (currentIndex + 1) % pokedex.length;
    setSelectedPokemon(pokedex[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedPokemon) return;
    const currentIndex = pokedex.findIndex((p) => p.number === selectedPokemon.number);
    const previousIndex = (currentIndex - 1 + pokedex.length) % pokedex.length;
    setSelectedPokemon(pokedex[previousIndex]);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <Layout></Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Pokédex</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {pokedex.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon)}
              onNext={handleNext}
              onPrevious={handlePrevious}
              showAddButton={false}
              showDeleteButton={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexList;
