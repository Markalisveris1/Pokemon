import React, { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Alert from "./Alert";

const Popup = ({ pokemon, closePopup, onNext, onPrevious }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const statsData = pokemon.stats.map((stat) => ({
    stat: stat.name,
    value: stat.base_stat,
  }));

  const addToPokedex = () => {
    let pokedex = [];
    try {
      const storedPokedex = JSON.parse(localStorage.getItem("pokedex"));
      if (Array.isArray(storedPokedex)) {
        pokedex = storedPokedex;
      } else {
        localStorage.removeItem("pokedex");
      }
    } catch (e) {
      localStorage.removeItem("pokedex");
    }

    const exists = pokedex.some((p) => p.number === pokemon.number);
    if (exists) {
      setAlertMessage(`${pokemon.name} existe déjà dans le Pokédex !`);
      setAlertType("error");
      return;
    }

    pokedex.push(pokemon);
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
    setAlertMessage(`${pokemon.name} a été ajouté au Pokédex !`);
    setAlertType("success");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={closePopup}>
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={closePopup}></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md z-60" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={closePopup}>
          ×
        </button>
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-lg"
              src={pokemon.image}
              alt={pokemon.name}
              style={{ backgroundColor: pokemon.color }}
            />
            <span className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-lg shadow-lg">
              {pokemon.number}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
          <p className="text-gray-700 mb-4">{pokemon.description}</p>
          <div className="mb-4">
            <strong>Type:</strong> {pokemon.types.map((type) => type.name).join(", ")}
          </div>
          <div className="mb-4">
            <strong>Stats:</strong>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={statsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Stats" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600" onClick={addToPokedex}>
            Ajouter au Pokédex
          </button>
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}>
          &larr;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}>
          &rarr;
        </button>
      </div>
      {alertMessage && <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} />}
    </div>
  );
};

export default Popup;
