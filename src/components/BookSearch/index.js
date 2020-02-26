import React, { useState } from 'react';

// Components
import FilterableSearchBar from '../SearchBar';
import BooksList from '../BooksList';

function BookFinder() {
  const [books, setBooks] = useState([]);

  const handleSearchSubmit = book => {
    setBooks([...books, book]);
  };

  return (
    <div className="book-finder">
      <FilterableSearchBar onSubmit={handleSearchSubmit} />
      <BooksList books={books} />
    </div>
  );
}

export default BookFinder;
