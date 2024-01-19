import React, { useState } from 'react';

const SearchForm = ({ onSearch, value }) => {
  const [searchId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    onSearch(searchId);
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search An Employee ID"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
      />
      
    </form>
  );
};

export default SearchForm;
