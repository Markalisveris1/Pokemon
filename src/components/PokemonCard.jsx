import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const PokemonCard = ({ pokemon, onNext, onPrevious, showAddButton = true, showDeleteButton = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInPokedex, setIsInPokedex] = useState(false);

  useEffect(() => {
    const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    setIsInPokedex(storedPokedex.some((p) => p.number === pokemon.number));
  }, [pokemon.number]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToPokedex = () => {
    const storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    if (!storedPokedex.some((p) => p.number === pokemon.number)) {
      storedPokedex.push(pokemon);
      localStorage.setItem("pokedex", JSON.stringify(storedPokedex));
      setIsInPokedex(true);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleRemoveFromPokedex = () => {
    let storedPokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
    storedPokedex = storedPokedex.filter((p) => p.number !== pokemon.number);
    localStorage.setItem("pokedex", JSON.stringify(storedPokedex));
    setIsInPokedex(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <div
        className="relative w-72 p-6 bg-white rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
        style={{ backgroundColor: pokemon.color }}
        onClick={togglePopup}>
        <div className="relative overflow-hidden rounded-lg" style={{ height: "200px" }}>
          <img
            className="absolute inset-0 w-full h-full object-contain transform transition-transform duration-300 hover:scale-110"
            src={pokemon.image}
            alt={pokemon.name}
            style={{ filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{pokemon.name}</h2>
          <p className="text-gray-600">{pokemon.number}</p>
        </div>
      </div>
      {isOpen && (
        <Popup
          pokemon={pokemon}
          closePopup={togglePopup}
          onNext={onNext}
          onPrevious={onPrevious}
          showAddButton={showAddButton}
          showDeleteButton={showDeleteButton}
        />
      )}
      <div className="flex justify-center mt-4">
        {isInPokedex ? (
          <button
            className="rounded-full bg-red-500 text-white p-2 hover:bg-red-700 transition-colors duration-300"
            onClick={handleRemoveFromPokedex}>
            -
          </button>
        ) : (
          <button
            className="rounded-full bg-green-500 text-white p-2 hover:bg-green-700 transition-colors duration-300"
            onClick={handleAddToPokedex}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
