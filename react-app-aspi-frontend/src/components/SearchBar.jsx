import React, { useState } from 'react';
import "./SearchBar.css"
const SearchBar = ({ onSearch }) => {
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

      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input className='search-input'
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Rechercher par Job, mot-clés ou entreprises"
          />
          <button className='btn-search' type="submit">Rechercher</button>
        </form>
      </div>
      <div>

      </div>
    </div>
  );
};

export default SearchBar;
