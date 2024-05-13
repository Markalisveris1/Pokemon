import React, { useState, useEffect, useCallback } from "react";
import Loader from './components/Loader'; // Importez le nouveau composant Loader SearchForm
import SearchComponent from './components/SearchComponent'; // Importez le nouveau composant Loader SearchForm
import 'flowbite';

const API_URL = process.env.REACT_APP_POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadPokemons = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=20&offset=${offset}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPokemons(prev => [...prev, ...data.results]);
      setOffset(prev => prev + 20);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setIsLoading(false);
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    loadPokemons();
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    loadPokemons(); // Initial load
  }, []);

  return (
    <div>
      <SearchComponent />

    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
          <div className="text-center p-4">
            <img className="mx-auto h-40 w-auto" src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
            <p className="mt-2 text-xl font-semibold">{pokemon.name}</p>
          </div>
        </div>
      ))}
      {isLoading && <Loader />}
    </div> 
    </div>
  );
};

export default PokemonList;
