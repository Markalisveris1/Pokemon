import React, { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchData();
  }, []);

  const addToPokedex = (pokemon) => {
    // Add the Pokemon to the Pokédex here
    console.log(`Adding ${pokemon.name} to the Pokédex`);
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      {pokemons.map((pokemon, index) => (
        <div key={index}>
          <h2>{pokemon.name}</h2>
          <p>{pokemon.url.split("/")[6]}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
          <p>
            {pokemon.types && pokemon.types.map(type => type.type.name).join(", ")}
          </p>
          <button onClick={() => addToPokedex(pokemon)}>
            Add to Pokédex
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;