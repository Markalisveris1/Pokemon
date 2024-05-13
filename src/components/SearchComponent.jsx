import React from "react";

const SearchComponent = ({ onSearchChange }) => {
  return (
    <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Pokémon..."
          onChange={(e) => onSearchChange(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default SearchComponent;
