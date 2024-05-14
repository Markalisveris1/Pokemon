import React, { useState } from "react";
import Popup from "./Popup";

const PokemonCard = ({ pokemon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
      {isOpen && <Popup pokemon={pokemon} closePopup={togglePopup} />}
    </div>
  );
};

export default PokemonCard;
