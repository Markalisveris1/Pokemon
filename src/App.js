import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from 'axios';
import 'flowbite';
import Layout from './components/Layout/Head';
import Loader from './components/Loader';
import SearchComponent from './components/SearchComponent';
import PokemonCard from './components/PokemonCard';

const API_URL = process.env.REACT_APP_POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const initialLoadComplete = useRef(false);

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
      // First, fetch all the URLs for the pokemons
      const urls = pokemons.map(pokemon => pokemon.url);

      // Then, use axios.all to fetch the details
      const detailsResponses = await axios.all(urls.map(url => axios.get(url)));
      const detailsData = detailsResponses.map(response => response.data);

      // Next, fetch the species data for each pokemon
      const speciesUrls = detailsData.map(details => details.species.url);
      const speciesResponses = await axios.all(speciesUrls.map(url => axios.get(url)));
      const speciesData = speciesResponses.map(response => response.data);

      // Combine the details and species data
      const details = detailsData.map((details, index) => {
        const species = speciesData[index];
        const stats = details.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
          effort: stat.effort
        }));

        const types = details.types.map(typeInfo => ({
          name: typeInfo.type.name,
          slot: typeInfo.slot,
          url: typeInfo.type.url
        }));

        return {
          name: details.name,
          number: `#${details.id.toString().padStart(3, '0')}`,
          image: details.sprites.other['dream_world'].front_default || details.sprites.front_default,
          description: species.flavor_text_entries.find(entry => entry.language.name === 'fr').flavor_text,
          types: types,
          color: species.color.name,
          stats: stats
        };
      });

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
    if (isLoading || !hasMore || isFetching) return;
    setIsFetching(true);
    try {
      setIsLoading(true);
      const newPokemons = await fetchPokemons(offset);
      if (newPokemons.length === 0) {
        setHasMore(false);
        return;
      }
      const pokemonDetails = await loadDetails(newPokemons);
      setAllPokemons(prev => [...prev, ...pokemonDetails]);
      setOffset(prev => prev + 20);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };


  useEffect(() => {
    if (!initialLoadComplete.current) {
      loadPokemons();
      initialLoadComplete.current = true;
    }
  }, []);

  useEffect(() => {
    updateDisplayedPokemons();
  }, [searchQuery, allPokemons]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || isFetching) return;
      loadPokemons();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, isFetching]);

  const handleNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = displayedPokemons.findIndex(p => p.number === selectedPokemon.number);
    const nextIndex = (currentIndex + 1) % displayedPokemons.length;
    setSelectedPokemon(displayedPokemons[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedPokemon) return;
    const currentIndex = displayedPokemons.findIndex(p => p.number === selectedPokemon.number);
    const previousIndex = (currentIndex - 1 + displayedPokemons.length) % displayedPokemons.length;
    setSelectedPokemon(displayedPokemons[previousIndex]);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <Layout></Layout>
      <div className="p-4">
        <SearchComponent
          onSearchChange={setSearchQuery}
          totalDisplayed={displayedPokemons.length}
          totalPokemons={allPokemons.length}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {displayedPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon)}
              onNext={handleNext}
              onPrevious={handlePrevious}
              showAddButton={false}
              showDeleteButton={true} />
          ))}
          {isLoading && <Loader />}
        </div>

      </div>
    </div>
  );
};

export default PokemonList;
