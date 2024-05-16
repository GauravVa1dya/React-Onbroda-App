import React from 'react';

const Suggestions = ({ searchTerm, onSuggestionClick }) => {
  // Simulated suggestion data
  const suggestions = [
    'Health & Fitness',
    'Shopping',
    'Events',
    'Task Management',
    'Games & Comic',
    'Self Help & Meditation',
    'Food Delivery',
    'Adidas'
  ];

  // Filter suggestions based on search term
  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="suggestions-container">
      {filteredSuggestions.length > 0 ? (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => onSuggestionClick(suggestion)}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <div className="no-suggestions">No suggestions available</div>
      )}
    </div>
  );
};

export default Suggestions;
