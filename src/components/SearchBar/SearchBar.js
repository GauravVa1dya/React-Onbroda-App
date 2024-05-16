import React, { useState } from 'react';
import Suggestions from './Suggestions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => { // Accept onSearch prop to communicate search term to parent
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Toggle suggestion visibility based on input value
    setShowSuggestions(value.trim() !== '');
    // Communicate search term to parent component
    onSearch(value);
  };

  const handleInputClick = () => {
    // Show the suggestion list when input field is clicked
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the search term
    setSearchTerm(suggestion);
    // Hide the suggestion list
    setShowSuggestions(false);
    // Communicate selected suggestion to parent component
    onSearch(suggestion);
  };

  return (
    <div className="search-container">
        <div className="search-input-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
                type="text"
                placeholder="Search Onbordings..."
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick} // Show suggestions when input field is clicked
                className="search-input" // Add a class for styling
            />
        </div>
      {showSuggestions && (
        <Suggestions searchTerm={searchTerm} onSuggestionClick={handleSuggestionClick} />
      )}
    </div>
  );
};

export default SearchBar;
