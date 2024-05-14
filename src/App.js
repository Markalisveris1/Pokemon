import React, { useState, useEffect, useCallback } from "react";
import Loader from './components/Loader';
import SearchComponent from './components/SearchComponent';
import 'flowbite';
import PokemonCard from './components/PokemonCard';

const API_URL = process.env.REACT_APP_POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon";

const samplePokemon = {
  name: 'Pikachu',
  number: '#025',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  description: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
  types: [
    { name: 'Electric', slot: 1, url: 'https://pokeapi.co/api/v2/type/13/' }
  ],
  color: '#FFEB3B',
  stats: [
    { name: 'hp', base_stat: 35, effort: 0 },
    { name: 'attack', base_stat: 55, effort: 0 },
    { name: 'defense', base_stat: 40, effort: 0 },
    { name: 'special-attack', base_stat: 50, effort: 0 },
    { name: 'special-defense', base_stat: 50, effort: 0 },
    { name: 'speed', base_stat: 90, effort: 2 }
  ]
};

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPokemons = async (offset, limit = 20) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadDetails = async (pokemons) => {
    try {
      const details = await Promise.all(pokemons.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const detailsData = await detailsResponse.json();

        // Fetch additional species details
        const speciesResponse = await fetch(detailsData.species.url);
        const speciesData = await speciesResponse.json();

        // Extracting the stats
        const stats = detailsData.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
          effort: stat.effort
        }));

        // Extracting the types
        const types = detailsData.types.map(typeInfo => ({
          name: typeInfo.type.name,
          slot: typeInfo.slot,
          url: typeInfo.type.url
        }));

        return {
          name: detailsData.name,
          number: `#${detailsData.id.toString().padStart(3, '0')}`,
          image: detailsData.sprites.other['dream_world'].front_default || detailsData.sprites.front_default,
          description: speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text,
          types: types,
          color: speciesData.color.name,
          stats: stats
        };
      }));
      return details;
    } catch (error) {
      console.error("Error loading details:", error);
      return [];
    }
  };


  const updateDisplayedPokemons = useCallback(() => {
    const filteredPokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedPokemons(filteredPokemons);
  }, [searchQuery, allPokemons]);

  const loadPokemons = async () => {
    if (isLoading || !hasMore) return;
    const newPokemons = await fetchPokemons(offset);
    if (newPokemons.length === 0) {
      setHasMore(false);
      return;
    }
    const pokemonDetails = await loadDetails(newPokemons);
    setAllPokemons(prev => [...prev, ...pokemonDetails]);
    setOffset(prev => prev + 20);
  };

  useEffect(() => {
    loadPokemons(); // Initial load with first 20 data
  }, []);

  useEffect(() => {
    updateDisplayedPokemons();
  }, [searchQuery, allPokemons]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
      loadPokemons();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div>

      <PokemonCard pokemon={samplePokemon} />
      <SearchComponent
        onSearchChange={setSearchQuery}
        totalDisplayed={displayedPokemons.length}
        totalPokemons={allPokemons.length}
      />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

        {displayedPokemons.map((pokemon, index) => (

          <PokemonCard pokemon={pokemon} />
          // <div key={index} className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden pokemon-card">
          //   <div className="text-center p-4">
          //     <img className="mx-auto h-40 w-auto" src={pokemon.image} alt={pokemon.name} />
          //     <p className="mt-2 text-xl font-semibold">{pokemon.name}</p>
          //     <div>{pokemon.types && pokemon.types.join(', ')}</div>
          //   </div>
          // </div>
        ))}
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default PokemonList;
