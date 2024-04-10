import React, { useState } from 'react';
import "./SearchBar.css";

const SearchBar = ({ onSearch, onOpenFilters }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Appeler la fonction de recherche avec la requête
    onSearch(query);
  };

  return (
    <div className='searchbar'>
      <div>
        <form id='form-search'onSubmit={handleSubmit}>
          <input className='search-input'
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Rechercher par job, mot-clés ou entreprises"
          />
          <button className='btn-search' type="submit">Rechercher</button>
        </form>
      </div>
      <div className='btn-container'> 
        {/* Passer la fonction onOpenFilters au onClick du bouton */}
        <button className='btn-filters'>Tous les filtres</button>
      </div>
    </div>
  );
};

export default SearchBar;
