import { useState } from 'react';

const useSearch = (initialQuery = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    handleSearchChange,
  };
};

export default useSearch;
