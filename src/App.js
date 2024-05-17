import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from 'axios';
import 'flowbite';
import Layout from './components/Layout/Head';
import Loader from './components/Loader';
import SearchComponent from './components/SearchComponent';
import PokemonCard from './components/PokemonCard';

const API_URL = process.env.REACT_APP_POKEMON_API_URL || "https://pokeapi.co/api/v2/pokemon";
const MAX_POKEMONS = 1350;

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
    }
  };

  const loadDetails = async (pokemons) => {
    try {
      const urls = pokemons.map(pokemon => pokemon.url);

      const detailsResponses = await Promise.all(urls.map(url => axios.get(url)));
      const detailsData = detailsResponses.map(response => response.data);

      const speciesUrls = detailsData.map(details => details.species.url);
      const speciesResponses = await Promise.all(speciesUrls.map(url => axios.get(url)));
      const speciesData = speciesResponses.map(response => response.data);

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

  const loadPokemons = useCallback(async (newOffset) => {
    if (isLoading || !hasMore || isFetching || newOffset >= MAX_POKEMONS) return;
    setIsFetching(true);
    try {
      setIsLoading(true);
      const newPokemons = await fetchPokemons(newOffset);
      if (newPokemons.length === 0) {
        setHasMore(false);
        return;
      }
      const pokemonDetails = await loadDetails(newPokemons);
      setAllPokemons(prev => [...prev, ...pokemonDetails]);
      setOffset(newOffset + 20);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [hasMore, isLoading, isFetching]);

  useEffect(() => {
    if (!initialLoadComplete.current) {
      loadPokemons(offset);
      initialLoadComplete.current = true;
    }
  }, [loadPokemons, offset]);

  useEffect(() => {
    updateDisplayedPokemons();
  }, [searchQuery, allPokemons, updateDisplayedPokemons]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || isFetching) return;
      loadPokemons(offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, isFetching, loadPokemons, offset]);

  useEffect(() => {
    if (searchQuery) {
      const loadRemainingPokemons = async () => {
        let currentOffset = offset;
        while (hasMore && currentOffset < MAX_POKEMONS) {
          await loadPokemons(currentOffset);
          currentOffset += 20;
        }
        updateDisplayedPokemons();
      };

      if (!isLoading && !isFetching) {
        loadRemainingPokemons();
      }
    }
  }, [searchQuery, hasMore, offset, isLoading, isFetching, loadPokemons, updateDisplayedPokemons]);

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
              showAddButton={true}
              showDeleteButton={false} />
          ))}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
