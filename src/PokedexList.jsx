import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Head";
import PokemonCard from "./components/PokemonCard";
import SearchComponent from "./components/SearchComponent";
import ConfirmPopup from "./components/ConfirmPopup";

const PokedexList = () => {
  const [pokedex, setPokedex] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const loadPokedex = () => {
    try {
      const storedPokedex = JSON.parse(localStorage.getItem("pokedex"));
      if (Array.isArray(storedPokedex)) {
        setPokedex(storedPokedex);
        setDisplayedPokemons(storedPokedex);
      } else {
        localStorage.removeItem("pokedex");
      }
    } catch (e) {
      localStorage.removeItem("pokedex");
    }
  };

  useEffect(() => {
    loadPokedex();

    const handleStorageChange = (e) => {
      if (e.key === "pokedex") {
        loadPokedex();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredPokemons = pokedex.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setDisplayedPokemons(filteredPokemons);
    } else {
      setDisplayedPokemons(pokedex);
    }
  }, [searchQuery, pokedex]);

  const handleNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = displayedPokemons.findIndex((p) => p.number === selectedPokemon.number);
    const nextIndex = (currentIndex + 1) % displayedPokemons.length;
    setSelectedPokemon(displayedPokemons[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedPokemon) return;
    const currentIndex = displayedPokemons.findIndex((p) => p.number === selectedPokemon.number);
    const previousIndex = (currentIndex - 1 + displayedPokemons.length) % displayedPokemons.length;
    setSelectedPokemon(displayedPokemons[previousIndex]);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleClearPokedex = () => {
    localStorage.removeItem("pokedex");
    setPokedex([]);
    setDisplayedPokemons([]);
    setShowConfirmPopup(false);
    setAlertMessage("La liste de Pokédex a été vidée.");
    window.dispatchEvent(new Event("storage"));
  };

  const handleClearButtonClick = () => {
    if (pokedex.length === 0) {
      setAlertMessage("La liste de Pokédex est déjà vide.");
    } else {
      setShowConfirmPopup(true);
    }
  };

  return (
    <div>
      <Layout></Layout>
      <div className="p-4">
        <SearchComponent
          onSearchChange={setSearchQuery}
          totalDisplayed={displayedPokemons.length}
          totalPokemons={pokedex.length}
        />

        <h2 className="text-2xl font-bold mb-4 mt-4">My Pokédex</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {displayedPokemons.map((pokemon, index) => (
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

      <button
        className="fixed bottom-4 right-4 rounded-full bg-black text-white p-4 hover:bg-red-500 transition-colors duration-300"
        onClick={handleClearButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {showConfirmPopup && (
        <ConfirmPopup
          message="Voulez-vous vraiment vider votre Pokédex ?"
          onConfirm={handleClearPokedex}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}

      {alertMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {alertMessage}
          <button className="ml-4 bg-white text-black p-2 rounded-full" onClick={() => setAlertMessage(null)}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default PokedexList;
