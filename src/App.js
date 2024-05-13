import React, { useState, useEffect, useCallback } from "react";
import Loader from './components/Loader';
import SearchComponent from './components/SearchComponent';
import 'flowbite';

const API_URL = process.env.REACT_APP_POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemons = async (offset, limit = 20, all = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=${all ? 1000 : limit}&offset=${offset}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (all) setAllPokemons(data.results); // Si la recherche est activée, stockez tous les Pokémon
      return data.results;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadPokemons = async (reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;
    const newPokemons = await fetchPokemons(reset ? 0 : offset);
    if (reset) {
      setDisplayedPokemons(newPokemons);
    } else {
      setDisplayedPokemons(prev => [...prev, ...newPokemons]);
    }
    setOffset(prev => prev + newPokemons.length);
    setHasMore(newPokemons.length > 0);
  };

  const handleSearchChange = async (value) => {
    setSearchTerm(value);
    if (!value) {
      setDisplayedPokemons([]);
      setOffset(0);
      loadPokemons(true);
    } else {
      await fetchPokemons(0, 1000, true);
      const filtered = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase()));
      setDisplayedPokemons(filtered);
    }
  };

  useEffect(() => {
    loadPokemons(); // Initial load with pagination
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
    loadPokemons();
  }, [isLoading, hasMore]);

  return (
    <div>
      <SearchComponent onSearchChange={handleSearchChange} />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayedPokemons.map((pokemon, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden pokemon-card">
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
